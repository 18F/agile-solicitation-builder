# -*- coding: utf-8 -*-
import sys
import config
import logging
import StringIO

from flask import Flask, send_from_directory, send_file, request, jsonify
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.engine import reflection
from sqlalchemy.schema import (
    MetaData,
    Table,
    DropTable,
    ForeignKeyConstraint,
    DropConstraint,
    )

import create_document

from models import Agency, RFQ, ContentComponent, AdditionalClin, CustomComponent, Base, Session, Deliverable, engine
from seed import agencies


# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='app')
app.config['APP_SETTINGS'] = config.DevelopmentConfig
# app.config.from_object(os.environ['APP_SETTINGS'])
app.logger.addHandler(logging.StreamHandler(sys.stdout))
app.logger.setLevel(logging.ERROR)
db = SQLAlchemy(app)
api = Api(app, prefix="/api")


def dicts_to_dict(dicts, key):
    new_dict = {}
    for i, d in enumerate(dicts):
        new_key = d[key]
        new_dict[new_key] = dicts[i]['text']
    return new_dict


class Agencies(Resource):
    def get(self):
        session = Session()
        agencies = session.query(Agency).order_by(Agency.full_name).all()
        return jsonify(data=[a.to_dict() for a in agencies])


class Data(Resource):

    def get(self, rfq_id, section_id):
        session = Session()
        content = session.query(ContentComponent).filter_by(document_id=rfq_id).filter_by(section=int(section_id))
        return jsonify(data=dicts_to_dict([c.to_dict() for c in content], "name"))

    def put(self, rfq_id, section_id):
        parser = reqparse.RequestParser()
        parser.add_argument('data')
        data = request.get_json()['data']
        for key in data:
            session = Session()
            component = session.query(ContentComponent).filter_by(document_id=rfq_id).filter_by(name=key).first()            
            component.text = data[key].encode('ascii', 'ignore')
            session.merge(component)
            session.commit()

        # this needs to be done client side to allow for jumping between sections
        if section_id < 10:
            url = '#/rfp/' + str(rfq_id) + '/question/' + str(int(section_id) + 1)
        else:
            url = "#/rfp/" + str(rfq_id) + "/results"
        return jsonify({"url": url})


class Deliverables(Resource):

    def get(self, rfq_id):
        session = Session()
        deliverables = session.query(Deliverable).filter_by(document_id=rfq_id).order_by(Deliverable.id).all()
        return jsonify(data=[d.to_dict() for d in deliverables])

    def put(self, rfq_id):
        session = Session()
        data = request.get_json()['data']
        for item in data:
            deliverable = session.query(Deliverable).filter_by(document_id=rfq_id).filter_by(name=item["name"]).first()            
            deliverable.value = item["value"]
            deliverable.text = item["text"]
            session.merge(deliverable)
            session.commit()


class Clin(Resource):

    def get(self, rfq_id):
        session = Session()
        clins = session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        return jsonify(data=[c.to_dict() for c in clins])

    def post(self, rfq_id):
        data = request.get_json()["data"]

        row1 = data['row1']
        row2 = data['row2']
        row3a = data['row3a']
        row3b = data['row3b']
        row4a = data['row4a']
        row4b = data['row4b']
        row5a = data['row5a']
        row5b = data['row5b']
        row6a = data['row6a']
        row6b = data['row6b']

        additional_clin = AdditionalClin(document_id=int(rfq_id), row1=row1, row2=row2, row3a=row3a, row3b=row3b, row4a=row4a, row4b=row4b, row5a=row5a, row5b=row5b, row6a=row6a, row6b=row6b)
        session = Session()
        session.add(additional_clin)
        session.commit()

        clins = session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        return jsonify(data=[c.to_dict() for c in clins])


class CustomComponents(Resource):

    def get(self, rfq_id, section_id):
        session = Session()
        components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=section_id).order_by(CustomComponent.id).all()
        return jsonify(data=[c.to_dict() for c in components])

    def put(self, rfq_id, section_id):
        data = request.get_json()['data']
        for key in data:
            session = Session()
            component = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(name=key).first()
            component.text = data[key]
            session.merge(component)
            session.commit()

    def post(self, rfq_id, section_id):
        session = Session()
        data = request.get_json()["data"]
        title = data['title']
        text = data['text']

        # give component a name
        current_components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=section_id).all()
        name = "component" + str(len(current_components) + 1)

        custom_component = CustomComponent(document_id=int(rfq_id), section=int(section_id), name=name, title=title, text=text)

        session.add(custom_component)
        session.commit()

        components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=int(section_id)).all()
        return jsonify(data=[c.to_dict() for c in components])


class Create(Resource):

    def get(self):
        session = Session()
        rfqs = session.query(RFQ).all()
        return jsonify(data=[r.to_dict() for r in rfqs])

    def post(self, **kwargs):
        parser = reqparse.RequestParser()
        parser.add_argument('agency')
        parser.add_argument('doc_type')
        parser.add_argument('setaside')
        parser.add_argument('base_number')
        parser.add_argument('program_name')

        args = parser.parse_args()

        agency = args['agency'].decode('latin-1').encode('utf8')
        doc_type = args['doc_type'].decode('latin-1').encode('utf8')
        program_name = args['program_name'].decode('latin-1').encode('utf8')
        setaside = args['setaside'].decode('latin-1').encode('utf8')
        base_number = args['base_number'].decode('latin-1').encode('utf8')

        rfq = RFQ(agency=agency, doc_type=doc_type, program_name=program_name, setaside=setaside, base_number=base_number)
        session = Session()
        session.add(rfq)
        session.commit()

        return jsonify({'id': rfq.id})


class DeleteRFQ(Resource):

    def delete(self, rfq_id):
        session = Session()

        deliverables = session.query(Deliverable).filter_by(document_id=rfq_id).all()
        for d in deliverables:
            session.delete(d)

        content_components = session.query(ContentComponent).filter_by(document_id=rfq_id).all()
        for c in content_components:
            session.delete(c)

        custom_components = session.query(CustomComponent).filter_by(document_id=rfq_id).all()
        for c in custom_components:
            session.delete(c)

        additional_clins = session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        for a in additional_clins:
            session.delete(a)

        rfq = session.query(RFQ).filter_by(id=int(rfq_id)).first()

        session.delete(rfq)
        session.commit()
        message = "RFQ #" + str(rfq_id) + " deleted."

        return jsonify({'message': message})


api.add_resource(Agencies, '/agencies')
api.add_resource(Data, '/get_content/<int:rfq_id>/section/<int:section_id>')
api.add_resource(Deliverables, '/deliverables/<int:rfq_id>')
api.add_resource(Create, '/rfqs')
api.add_resource(Clin, '/clins/<int:rfq_id>')
api.add_resource(CustomComponents, '/custom_component/<int:rfq_id>/section/<int:section_id>')
api.add_resource(DeleteRFQ, '/delete/rfqs/<int:rfq_id>')

def drop_everything():
    # https://bitbucket.org/zzzeek/sqlalchemy/wiki/UsageRecipes/DropEverything
    conn = engine.connect()

    # the transaction only applies if the DB supports
    # transactional DDL, i.e. Postgresql, MS SQL Server
    trans = conn.begin()

    inspector = reflection.Inspector.from_engine(engine)

    # gather all data first before dropping anything.
    # some DBs lock after things have been dropped in 
    # a transaction.

    metadata = MetaData()

    tbs = []
    all_fks = []

    for table_name in inspector.get_table_names():
        fks = []
        for fk in inspector.get_foreign_keys(table_name):
            if not fk['name']:
                continue
            fks.append(
                ForeignKeyConstraint((), (), name=fk['name'])
                )
        t = Table(table_name, metadata, *fks)
        tbs.append(t)
        all_fks.extend(fks)

    for fkc in all_fks:
        conn.execute(DropConstraint(fkc))

    for table in tbs:
        conn.execute(DropTable(table))

    trans.commit()

def create_tables():

    # delete old records
    drop_everything()

    session = Session()

    Base.metadata.create_all(engine)    

    for agency in agencies:
        a = Agency(abbreviation=agency, full_name=agencies[agency])
        session.add(a)
        session.commit()


# map index.html to app/index.html, map /build/bundle.js to app/build.bundle.js
@app.route('/seed_database')
def initiate():
    create_tables()
    return "Database Seeded"

@app.route('/')
def index():
    return send_from_directory("app", "index.html")


@app.route('/<path:path>')
def send_js(path):
    return send_from_directory("app", path)


@app.route('/download/<int:rfq_id>')
def download(rfq_id):
    document = create_document.create_document(rfq_id)
    strIO = StringIO.StringIO()
    document.save(strIO)
    strIO.seek(0)
    return send_file(strIO, attachment_filename="RFQ.docx", as_attachment=True)


@app.route('/agile_estimator')
def agile_estimator():
    return send_file("AgileEstimator.xlsx")



if __name__ == "__main__":
    app.run(debug=True)

    # create_tables()
    # if len(sys.argv) > 1 and sys.argv[1] == "init":
    #     create_tables()
    # else:
    #     port = int(os.getenv('PORT', 5000))
    #     app.run(port=port, debug=True)

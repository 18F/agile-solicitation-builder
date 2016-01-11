# -*- coding: utf-8 -*-
from flask import Flask, send_from_directory, request, jsonify, make_response
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy

from pprint import pprint

import os, shutil
import sys
import config
import datetime

import create_document

from docx import Document
from models import Agency, RFQ, ContentComponent, AdditionalClin, CustomComponent, Base, Session, Deliverable, engine
from seed import agencies


# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='app')
app.config['APP_SETTINGS'] = config.DevelopmentConfig
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
            print key
            session = Session()
            component = session.query(ContentComponent).filter_by(document_id=rfq_id).filter_by(name=key).first()            
            component.text = data[key]
            session.merge(component)
            session.commit()

        # this needs to be done client side to allow for jumping between sections
        if section_id < 10:
            url =  '#/rfp/' + str(rfq_id) + '/question/' + str(int(section_id) + 1)
        else:
            url = "#/rfp/" + str(rfq_id) + "/results"
        return jsonify({"url": url})

class Clin(Resource):

    def get(self, rfq_id):
        session = Session()
        clins = session.query(AdditionalClin).filter_by(document_id=rfq_id).all()
        return jsonify(data=[c.to_dict() for c in clins])

    def post(self, rfq_id):
        parser = reqparse.RequestParser()
        clin_values = ["row1", "row2", "row3a", "row3b", "row4a", "row4b", "row5a", "row5b", "row6a", "row6b",]
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
        
class AddComponent(Resource):

    def get(self, rfq_id, section_id):
        session = Session()
        components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=section_id).all()
        return jsonify(data=[c.to_dict() for c in components])

    def post(self, rfq_id, section_id):
        parser = reqparse.RequestParser()
        data = request.get_json()["data"]
        title = data['title']
        description = data['description']

        custom_component = CustomComponent(document_id=int(rfq_id), section=int(section_id), title=title, description=description)
        session = Session()
        session.add(custom_component)
        session.commit()

        components = session.query(CustomComponent).filter_by(document_id=rfq_id).filter_by(section=int(section_id)).all()
        return jsonify(data=[c.to_dict() for c in components])
        

class Create(Resource):

    def get(self):
        session = Session()
        rfqs = session.query(RFQ).all();
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


api.add_resource(Agencies, '/agencies')
api.add_resource(Data, '/get_content/<int:rfq_id>/sections/<int:section_id>')
api.add_resource(Create, '/rfqs')
api.add_resource(Clin, '/clins/<int:rfq_id>')
api.add_resource(AddComponent, '/custom_component/<int:rfq_id>/section/<int:section_id>')

# map index.html to app/index.html, map /build/bundle.js to app/build.bundle.js
@app.route('/initiate')
def initiate():
    RFQ.create(agency="", agency_full_name="", doc_type="")

@app.route('/')
def index():
    return send_from_directory("app", "index.html")

@app.route('/<path:path>')
def send_js(path):
    return send_from_directory("app", path)

@app.route('/download/<int:rfq_id>')
def download(rfq_id):
    doc_name = create_document.create_document(rfq_id)
    print doc_name
    return send_from_directory(directory="downloads", filename=doc_name)

def create_tables():

    if os.path.isdir("downloads"):
        shutil.rmtree("downloads")
    os.makedirs("downloads")

    Base.metadata.create_all(engine)
    session = Session()

    for agency in agencies:
        a = Agency(abbreviation=agency, full_name=agencies[agency])
        session.add(a)
        session.commit()


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "init":
        create_tables()
    else:
        app.run(debug=True)



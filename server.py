# -*- coding: utf-8 -*-
from flask import Flask, send_from_directory, request, jsonify, make_response
from flask_restful import Resource, Api, reqparse
from flask_sqlalchemy import SQLAlchemy

from pprint import pprint

import os
import sys
import config

from docx import Document
from models import Agency, RFQ, ContentComponent, ValueComponent, Base, Session, engine
from seed import agencies


# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='app')
app.config['APP_SETTINGS'] = config.DevelopmentConfig
db = SQLAlchemy(app)
api = Api(app, prefix="/api")

# def abort_if_content_doesnt_exist(content_key):
#     if content_key not in DATA:
#         abort(404, message="Content {} doesn't exist".format(key))

parser = reqparse.RequestParser()
parser.add_argument('agency')
parser.add_argument('doc_type')
parser.add_argument('setaside')
parser.add_argument('base_number')

class Agencies(Resource):
    def get(self):
        session = Session()
        agencies = session.query(Agency).order_by(Agency.full_name).all()
        return jsonify(data=[a.to_dict() for a in agencies])

class Data(Resource):

    def get(self, content_key):        
        print "content key! " + content_key
        session = Session()
        content = session.query(ContentComponent).filter_by(name=content_key)
        print content
        return content[0].text

    def put(self, content_key):
        data = request.get_json()
        content = data['text']
        print content
        print "content '" + content + "'"
        # DATA[content_key] = content

class Value(Resource):

    def get(self, value_key):        
        print "value key! " + value_key
        session = Session()
        content = session.query(ValueComponent).filter_by(name=value_key)
        return content[0].text

class Create(Resource):

    def get(self):
        session = Session()
        rfqs = session.query(RFQ).all();
        return jsonify(data=[r.to_dict() for r in rfqs])

    def post(self, **kwargs):
        args = parser.parse_args()
        agency = args['agency']
        doc_type = args['doc_type']
        setaside = args['setaside']
        base_number = args['base_number']
        print agency, doc_type, setaside, base_number

        rfq = RFQ(agency=agency, doc_type=doc_type, setaside=setaside, base_number=base_number)
        session = Session()
        session.add(rfq)
        session.commit()

        return jsonify({'id': '1'})
       

class Workon(Resource):
    
    def get(self, rfq_id):
        # get a specific RFQ    
        pass


    def put(self, rfq_id):
        # update a specific RFQ
        pass

class Sections(Resource):

    def get(self, rfq_id, section_id):
        # Get the values for a specific section
        session = Session()
        sections = session.query(ContentComponent).filter_by(section=section_id).all()
        values = session.query(ValueComponent).filter_by(section=section_id).all()
        print type(sections)
        print type(values)
        return sections

    def put(self, rfq_id, section_id):
        # Update the value for a specific section
        pass

class Results(Resource):

    def get(self, rfq_id):
        # Get the results
        pass


api.add_resource(Agencies, '/agencies')
api.add_resource(Data, '/get_content/<string:content_key>')
api.add_resource(Value, '/get_value/<string:value_key>')
api.add_resource(Create, '/rfqs')
api.add_resource(Workon, '/rfqs/<int:rfq_id>')
api.add_resource(Sections, '/rfqs/<int:rfq_id>/sections/<int:section_id>')
api.add_resource(Results, '/rfqs/<int:rfq_id>/results')
# api.add_resource(Downloads, '/rfqs/<int:rfq_id>/results/download')

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

# @app.route('/downloads/<path:filename>', methods=['GET'])
# def download(filename):
#     uploads = os.path.join(current_app.root_folder, app.config['UPLOAD_FOLDER'])
#     return send_from_directory(directory=uploads, filename=filename)

@app.route('/download/<int:rfq_id>')
def download(rfq_id):
    # send_file?
    document = Document()

    session = Session()
    rfq = session.query(RFQ).filter_by(id=rfq_id).first()
    print rfq

    title = "RFQ for " + rfq.agency
    document.add_heading('RFQ', 0)

    p = document.add_paragraph('A plain paragraph having some ')
    p.add_run('bold').bold = True
    p.add_run(' and some ')
    p.add_run('italic.').italic = True

    document.add_heading('Heading, level 1', level=1)
    document.add_paragraph('Intense quote', style='IntenseQuote')

    document.add_paragraph(
        'first item in unordered list', style='ListBullet'
    )
    document.add_paragraph(
        'first item in ordered list', style='ListNumber'
    )

    doc_name = "RFQ_" + str(rfq_id) + ".docx"
    file_path = os.path.join(doc_name, "downloads")
    document.save(file_path)

    # download_folder = os.path.join(current_app.root_folder, "downloads")
    return send_from_directory(directory="downloads", filename=doc_name)

def create_tables():
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



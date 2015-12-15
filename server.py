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

terms_text = "AGILE DEVELOPMENT/AGILE SOFTWARE DEVELOPMENT: A proven commercial methodology for software development that is characterized by incremental and iterative processes where releases are produced in close collaboration with the customer. This process improves investment manageability, lowers risk of project failure, shortens the time to realize value, and allows agencies to better adapt to changing needs.\n\nCONTRACTING OFFICER (CO): The Government official responsible for the execution and administration of contracts on behalf of the Government.\n\nCONTRACTING OFFICER’S REPRESENTATIVE (COR): An individual designated by the Contracting Officer to act as his/her representative to assist in managing the contract. The authorities and limitations of a COR appointment are contained in the written letter of appointment.\n\nDAY: A calendar day unless stated otherwise. If a deliverable is due on a weekend or holiday, the deliverable shall be considered due the next business day.\n\nQUARTER: A quarter will be defined as the first of January through the end of March, first of April through the end of June, first of July through the end of September, and first of October through the end of December.\n\nBUSINESS DAY: Any day other than a Saturday, a Sunday, a Federal holiday or other day on which the Federal Government by law or executive order is closed. Note: This includes any weather-related office closures if the place of performance is in a Federal Building.\n\nMINIMUM FUNCTIONALITY: The minimum capabilities a product should have to meet the Government’s objectives.\n\nAGILE ENVIRONMENT: A team-based setting for IT product development where the Agile development methodology is used.\n\nITERATION/SPRINT/RELEASE CYCLE:Divisions of time within the Agile development framework.  Each iteration is small in scale (i.e., encompasses a single or a few function(s) within a multistep process). Multiple iterations form releases. For more information, see the TechFAR at https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md\n\nMILESTONES/EPICS:A necessary step in a process. In this document, used to refer to components of a given project.\n\nSTORY POINT:A measurement of work and effort. Story points are used in an Agile development environment to demonstrate how much work was achieved in a given sprint or iteration. For more information, see the <a href='https://github.com/WhiteHouse/playbook/blob/gh-pages/_includes/techfar-online.md' target='_blank'>TechFAR</a>\n\nTHROUGHPUT: The amount of material or items passing through a system or process; in this document, refers to the work activity of a product development team.";
payment_schedule_text = "The contractor shall be paid upon the completion of each iteration upon its acceptance and verification by the Contracting Officer’s Representative (COR). Invoices shall be submitted at the end of each iteration in accordance with the delivery schedule as established in the Performance Work Statement."

DATA = {
    "definitions": terms_text, 
    "payment_schedule": payment_schedule_text,
}

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

     def post(self, **kwargs):
        # get agency, doc_type, setaside values
        # need to figure out how to transfer values from request in args
        args = parser.parse_args()
        agency = args['agency']
        doc_type = args['doc_type']
        setaside = args['setaside']
        base_number = args['base_number']
        print agency, doc_type, setaside, base_number

        rfq = RFQ(agency=agency, doc_type=doc_type, setaside=setaside, base_number=base_number)
        session = Session()
        session.add(rfq)

        return jsonify({'id': '1'})
        # session.commit()
        # return redirect("/#/rfp/1/question/1")

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

    rfq = RFQ(agency="GSA", doc_type="Task Order")
    session.add(rfq)
    session.commit()


if __name__ == "__main__":
    if len(sys.argv) > 1 and sys.argv[1] == "init":
        create_tables()
    else:
        app.run(debug=True)



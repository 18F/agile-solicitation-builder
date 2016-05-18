# -*- coding: utf-8 -*-
import os
import shutil
import sys
import config
import logging
try:
    import StringIO
except ImportError:
    from io import StringIO

from flask import Flask, send_from_directory, send_file
from waitress import serve
port = port = int(os.getenv("VCAP_APP_PORT"))
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from flask_cli import FlaskCLI
from sqlalchemy import create_engine
from sqlalchemy.engine import reflection

import create_document
from models import Base, Agency, session, engine
from seed import agencies
from resources import Agencies, Data, Deliverables, Clin, CustomComponents, Create, DeleteRFQ

logger = logging.getLogger('waitress')
logger.setLevel(logging.INFO)

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='app')
FlaskCLI(app)
app.config['APP_SETTINGS'] = config.DevelopmentConfig
# app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)
api = Api(app, prefix="/api")

api.add_resource(Agencies, '/agencies')
api.add_resource(Data, '/get_content/<int:rfq_id>/section/<int:section_id>')
api.add_resource(Deliverables, '/deliverables/<int:rfq_id>')
api.add_resource(Create, '/rfqs')
api.add_resource(Clin, '/clins/<int:rfq_id>')
api.add_resource(CustomComponents, '/custom_component/<int:rfq_id>/section/<int:section_id>')
api.add_resource(DeleteRFQ, '/delete/rfqs/<int:rfq_id>')



def create_tables():
    # delete old records
    Base.metadata.drop_all(engine)
    #
    Base.metadata.create_all(engine)
    #
    for agency in agencies:
        a = Agency(abbreviation=agency, full_name=agencies[agency])
        session.add(a)
        session.commit()



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

@app.cli.command()
def seed_db():
    create_tables()

if __name__ == "__main__":
    serve(app, port=port)

#!/usr/bin/python -tt
# -*- coding: utf-8 -*-
import os, sys
import shutil
import config
import logging
from io import BytesIO
import base64

from flask import Flask, send_from_directory, send_file, g, request, jsonify
from waitress import serve
port = os.getenv("PORT") or 5000
from flask_restful import Api
from flask_sqlalchemy import SQLAlchemy

from flask_cli import FlaskCLI
from sqlalchemy import create_engine
from sqlalchemy.engine import reflection

import create_document
from models import User, Base, Agency, session, engine
from seed import agencies
from resources import auth, Users, Agencies, Data, Deliverables, Clin, CustomComponents, Create, DeleteRFQ

logger = logging.getLogger('waitress')
logger.setLevel(logging.INFO)

# set the project root directory as the static folder, you can set others.
app = Flask(__name__, static_folder='app')
FlaskCLI(app)
app.config['APP_SETTINGS'] = config.DevelopmentConfig
# app.config.from_object(os.environ['APP_SETTINGS'])
db = SQLAlchemy(app)
api = Api(app, prefix="/api")

api.add_resource(Users, '/users')
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

@auth.verify_password
def verify_password(username, password):
    user = User.verify_auth_token(username);
    if not user:
        user = session.query(User).filter_by(username = username).first()
        if not user or not user.verify_password(password):
            return False
    g.user = user
    return True

@app.route('/api/authtest')
@auth.login_required
def get_resource():
    return jsonify({ 'data': 'Hello, %s!' % g.user.username })

@app.route('/api/isLoggedIn')
def isLoggedIn():
    auth = request.headers.get('Authorization')
    result = { 'loggedIn': False }
    # The Authorization header should look like "Basic username:password",
    # so it must be at least 6 characters long or it's invalid.
    if auth is not None and len(auth) > 6:
        # Decode the username:password part.
        pair = base64.b64decode(auth[6:])
        # If the user is logged in, the username should be their token
        # and the password should be "none".  Assume that the decoded
        # string is ":none" and ditch it.  If that's not right, the
        # verification will fail and that's a-okay.
        result['loggedIn'] = verify_password(pair[:-5], '');
    return jsonify(result)

@app.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({ 'token': token.decode('ascii') })

@app.route('/<path:path>')
def send_js(path):
    return send_from_directory("app", path)


@app.route('/download/<int:rfq_id>')
def download(rfq_id):
    document = create_document.create_document(rfq_id)
    strIO = BytesIO()
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

# -*- coding: utf-8 -*-

from io import BytesIO
import base64
from flask import (
    Blueprint, request, send_from_directory,
    jsonify, g, send_file, current_app
)
from asb.extensions import auth, db
from asb.api.models import User
from asb import create_document

blueprint = Blueprint('asb', __name__)

@auth.verify_password
def verify_password(username, password):
    user = User.verify_auth_token(username)
    if not user:
        user = db.session.query(User).filter_by(username=username).first()
        if not user or not user.verify_password(password):
            return False
            g.user = user
            return True

@blueprint.route('/')
def index():
    return send_from_directory(current_app.static_folder, "index.html")

@blueprint.route('/api/authtest')
@auth.login_required
def get_resource():
    return jsonify({'data': 'Hello, %s!' % g.user.username})

@blueprint.route('/api/isLoggedIn')
def isLoggedIn():
    auth = request.headers.get('Authorization')
    result = {'loggedIn': False}
    # The Authorization header should look like "Basic username:password",
    # so it must be at least 6 characters long or it's invalid.
    if auth is not None and len(auth) > 6:
        # Decode the username:password part.
        pair = base64.b64decode(auth[6:]).decode('utf-8')
        # If the user is logged in, the username should be their token
        # and the password should be "none".  Assume that the decoded
        # string is ":none" and ditch it.  If that's not right, the
        # verification will fail and that's a-okay.
        result['loggedIn'] = verify_password(pair[:-5], '')
    return jsonify(result)

@blueprint.route('/api/token')
@auth.login_required
def get_auth_token():
    token = g.user.generate_auth_token()
    return jsonify({'token': token.decode('ascii')})

@blueprint.route('/<path:path>')
def send_js(path):
    return send_from_directory(current_app.static_folder, path)

@blueprint.route('/download/<int:rfq_id>')
def download(rfq_id):
    document = create_document.create_document(rfq_id)
    strIO = BytesIO()
    document.save(strIO)
    strIO.seek(0)
    return send_file(strIO, attachment_filename="RFQ.docx", as_attachment=True)

@blueprint.route('/agile_estimator')
def agile_estimator():
    return send_file("../AgileEstimator.xlsx")

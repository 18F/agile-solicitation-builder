# -*- coding: utf-8 -*-

import os
from werkzeug.utils import import_string

from urllib.parse import urlparse, urlunparse

from flask import Flask, redirect, request
from asb.extensions import db
from asb.api.resources import api
from asb.views import blueprint

def create_app():
    config_string = os.environ['CONFIG']
    if isinstance(config_string, str):
        config = import_string(config_string)
    else:
        config = config_string

    app = Flask(__name__, static_folder='../web')
    app.config.from_object(config)
    register_extensions(app)
    register_blueprints(app)

    @app.before_request
    def before_request():
        urlparts = urlparse(request.url)
        if urlparts.netloc == 'playbook-in-action.apps.cloud.gov':
            urlparts_list = list(urlparts)
            urlparts_list[1] = 'agile-solicitation-builder.apps.cloud.gov'
            return redirect(urlunparse(urlparts_list), code=301)

    return app

def register_blueprints(app):
    app.register_blueprint(blueprint)
    return None

def register_extensions(app):
    api.init_app(app)
    db.init_app(app)
    return None

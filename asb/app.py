# -*- coding: utf-8 -*-

from urllib.parse import urlparse, urlunparse
import asb.config as config

from flask import Flask, redirect, request
from asb.extensions import db
from asb.api.resources import api
from asb.views import blueprint

def create_app():
    app = Flask(__name__, static_folder='web')
    app.config['APP_SETTINGS'] = config.DevelopmentConfig
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

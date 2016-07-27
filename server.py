#!/usr/bin/python -tt
# -*- coding: utf-8 -*-
import os
import logging

from waitress import serve

from asb.api.models import Base, Agency, session, engine
from asb.seed import agencies
from asb.app import create_app

port = os.getenv("PORT") or 8000
logger = logging.getLogger('waitress')
logger.setLevel(logging.INFO)

app = create_app()

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

@app.cli.command()
def seed_db():
    create_tables()

if __name__ == "__main__":
    if app.config['DEBUG']:
        app.run(port=port)
    else:
        serve(app, port=port)

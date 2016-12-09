import os
from flask_testing import TestCase

from asb.app import create_app as _create_app
from asb.extensions import db

class BaseTestCase(TestCase):
    def create_app(self):
        # pass in test configuration
        os.environ['CONFIG'] = 'asb.config.TestingConfig'
        return _create_app()

    def setUp(self):

        db.create_all()

    def tearDown(self):
        db.session.remove()
        db.drop_all()
        db.get_engine(self.app).dispose()

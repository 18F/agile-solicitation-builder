import unittest
import flask.ext.testing
from flask.ext.testing import TestCase

from server import app, db

class MyTest(TestCase):

    SQLALCHEMY_DATABASE_URI = "sqlite://"
    TESTING = True

    def create_app(self):

        # pass in test configuration
        return create_app(self)

    def setUp(self):

        db.create_all()

    def tearDown(self):

        db.session.remove()
        db.drop_all()

if __name__ == '__main__':
    unittest.main()

import unittest
from flask_testing import TestCase

from asb.app import create_app as _create_app
from asb.extensions import db

class MyTest(TestCase):

    SQLALCHEMY_DATABASE_URI = "sqlite://"
    TESTING = True

    def create_app(self):

        # pass in test configuration
        return _create_app(self)

    def setUp(self):

        db.create_all()

    def tearDown(self):

        db.session.remove()
        db.drop_all()

if __name__ == '__main__':
    unittest.main()

import base64
from asb.app import db
from asb.test.integration.base import BaseTestCase
from asb.api.models import User

class TestLoginRoutes(BaseTestCase):
    def make_header(self, valid=True):
        if valid:
            creds = base64.b64encode(b'test:pass').decode('utf-8')
        else:
            creds = base64.b64encode(b'bad:bad').decode('utf-8')
        return {
            'Authorization': 'Basic ' + creds
        }

    def setUp(self):
        super(TestLoginRoutes, self).setUp()
        user = User(username='test')
        user.hash_password('pass')
        db.session.add(user)
        db.session.commit()

    def test_valid_user(self):
        resp = self.client.get(
            '/api/token', headers=self.make_header(valid=True)
        )
        self.assertTrue(resp.status_code, 200)
        self.assertTrue('token' in resp.json)

    def test_invalid_user(self):
        resp = self.client.get(
            '/api/token', headers=self.make_header(valid=False)
        )
        self.assertTrue(resp.status_code, 401)
        self.assertEquals(b'Unauthorized Access', resp.data)

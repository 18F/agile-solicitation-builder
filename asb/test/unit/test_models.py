from unittest import TestCase
from unittest.mock import patch
from asb.api import models as m

class TestUserModel(TestCase):
    def setUp(self):
        self.user = m.User()
        self.token = self.user.generate_auth_token()

    def test_user_dumps_auth_token(self):
        self.assertTrue(type(self.token) is bytes)

    @patch('asb.api.models.User.get_by_id', return_value=m.User())
    def test_verify_auth_token(self, user):
        authed = m.User.verify_auth_token(self.token)
        self.assertTrue(type(authed) is m.User)

    def test_verify_invalid_auth_token(self):
        self.assertIsNone(m.User.verify_auth_token('bad'))

    def test_expired_auth_token(self):
        expired_token = self.user.generate_auth_token(expiration=-1)
        self.assertIsNone(m.User.verify_auth_token(expired_token))


class 

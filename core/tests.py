from django.test import TestCase

class HomeTest(TestCase):

    def test_get(self):
        """Must returns status code 200"""
        response = self.client.get('/')
        self.assertEqual(200, response.status_code)
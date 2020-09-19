from django.test import TestCase
from .forms import RegisterForm

class RegisterTest(TestCase):
    
    def setUp(self):
        self.response = self.client.get('/register/')

    def test_get(self):
        """Must return status code 200"""
        self.assertEqual(200, self.response.status_code)

    def test_template(self):
        """Must use register/register.html"""
        self.assertTemplateUsed(self.response, 'register/register.html')

    def test_html(self):
        """Template must contain input tags"""
        self.assertContains(self.response, '<form')
        self.assertContains(self.response, '<input', 5)
        self.assertContains(self.response, 'type="text', 1)
        self.assertContains(self.response, 'type="email"', 1)
        self.assertContains(self.response, 'type="submit"', 1)

    def test_csrf(self):
        """Template must contain csrf_token"""
        self.assertContains(self.response, 'csrfmiddlewaretoken')

    def test_has_form(self):
        """Context must have register form"""
        form = self.response.context['form']
        self.assertIsInstance(form, RegisterForm)

    def test_form_has_fields(self):
        """Form must have 4 fields"""
        form = self.response.context['form']
        self.assertSequenceEqual(['username', 'email', 'password1', 'password2'], list(form.fields))

class RegisterPostTest(TestCase):
    def setUp(self):
        data = dict(username='vsantos93', email='vsantos93@email.com',
                    password1='pythoneh43', password2='pythoneh43')
        self.response = self.client.post('/register/', data)


    def test_post(self):
        """Valid post must redirect to /register/"""
        self.assertEqual(302, self.response.status_code)
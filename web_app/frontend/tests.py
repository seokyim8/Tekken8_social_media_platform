from django.test import TestCase

# Create your tests here.

class general_test(TestCase):
    def setUp(self):
        '''Setting up process before unit testing.'''
        pass

    def test_get_home(self):
        '''Checking response code.'''
        response = self.client.get("/")
        self.assertEqual(response.status_code, 200)

    def tearDown(self) -> None:
        '''Cleanup after unit testing.'''
        return super().tearDown()
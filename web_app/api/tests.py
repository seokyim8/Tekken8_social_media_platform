from django.test import TestCase

# Create your tests here.

class general_test(TestCase):
    def setUp(self):
        '''Setting up process before unit testing.'''
        pass

    def test_login_page(self):
        '''Checking html element.'''
        response = self.client.get("/sign-in")
        self.assertEqual(response.status_code, 200)
    
    # TODO: Include testing for signing in and out (entering home page, etc.)

    def tearDown(self) -> None:
        '''Cleanup after unit testing.'''
        return super().tearDown()
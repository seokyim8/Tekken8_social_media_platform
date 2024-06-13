from django.test import TestCase
from django.test.client import Client
from django.contrib.auth.models import User

# Create your tests here.

class general_test(TestCase):
    def setUp(self):
        '''Setting up process before unit testing.'''
        pass

    def test_get_signin_page(self):
        '''Checking response code.'''
        response = self.client.get("/sign-in")
        self.assertEqual(response.status_code, 200)

    def tearDown(self) -> None:
        '''Cleanup after unit testing.'''
        return super().tearDown()
    
class page_accessibility_test(TestCase): # TODO: ADD MORE TESTS
    def setUp(self):
        '''Setting up process before unit testing.'''
        self.client = Client()

        user = User.objects.create(username="test_user")
        user.set_password("password")
        user.save()
        self.user = user

        self.client.force_login(self.user)

    def test_home(self): 
        '''Checking home page accessibility.'''

        self.assertSequenceEqual(self.user.username, "test_user")
        
        response = self.client.get("/home/?username=" + self.user.username)
        self.assertEqual(response.status_code, 200)

    def test_explore(self): 
        '''Checking explore page accessibility.'''

        response = self.client.get("/explore/?username=" + self.user.username)
        self.assertEqual(response.status_code, 200)

    def test_profile(self): 
        '''Checking profile page accessibility.'''

        response = self.client.get("/profile/?username=" + self.user.username)
        self.assertEqual(response.status_code, 200)

        response = self.client.get("/profile/?username=" + self.user.username + "&target=" + self.user.username)
        self.assertEqual(response.status_code, 200)

    def test_users_page(self): 
        '''Checking users page accessibility.'''

        response = self.client.get("/users/?username=" + self.user.username)
        self.assertEqual(response.status_code, 200)

    def test_saved_page(self): 
        '''Checking saved page accessibility.'''

        response = self.client.get("/saved/?username=" + self.user.username)
        self.assertEqual(response.status_code, 200)

    def test_create_post_page(self): 
        '''Checking create-post page accessibility.'''

        response = self.client.get("/create-post/?username=" + self.user.username)
        self.assertEqual(response.status_code, 200)


    def tearDown(self) -> None:
        '''Cleanup after unit testing.'''
        return super().tearDown()
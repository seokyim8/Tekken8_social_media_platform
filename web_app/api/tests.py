from django.test import TestCase
from django.test import Client
from django.contrib.auth.models import User
from .models import Post
import ast

# Create your tests here.

class general_test(TestCase):
    def setUp(self):
        '''Setting up process before unit testing.'''
        pass

    def test_login_page(self):
        '''Checking html element.'''
        response = self.client.get("/sign-in")
        self.assertEqual(response.status_code, 200)

    def tearDown(self) -> None:
        '''Cleanup after unit testing.'''
        return super().tearDown()
    

class authentication_test(TestCase): # TODO: ADD MORE TESTS
    def setUp(self):
        '''Setting up process before unit testing.'''
        self.client = Client()

        user = User.objects.create(username="test_user")
        user.set_password("password")
        user.save()
        self.user = user

    def test_logging_in_out(self): 
        '''Checking html element.'''
        
        self.assertEqual(self.client.login(username=self.user.username, password="password"), True)
        self.client.logout()
        response = self.client.get("/home/?username=" + self.user.username)
        self.assertEqual(response.status_code, 302) # Supposed to redirect logged out users to the sign-in page with status 302

    def tearDown(self) -> None:
        '''Cleanup after unit testing.'''
        return super().tearDown()
    

class restful_api_test(TestCase): # TODO: ADD MORE TESTS
    def setUp(self):
        '''Setting up process before unit testing.'''
        self.client = Client()

        user = User.objects.create(username="test_user", first_name="test", last_name="user")
        user.set_password("password")
        user.save()
        self.user = user

        self.client.force_login(self.user)

    def test_user_creation(self): 
        '''Checking the user creation api functionality.'''
        
        response = self.client.post(path="/api/create_user", data={"username": "username", "password": "password", "first_name": "Noah", "last_name": "Yim"})
        self.assertRedirects(response, "/sign-in", 302, 200)
        created_user = User.objects.get(username="username")
        self.assertIsNotNone(created_user)
        self.assertEqual(created_user.username, "username")

    def test_get_user_info(self): 
        '''Checking the get_user_info api functionality.'''

        # Scenario 1: User looks up their own profile
        response = self.client.get(path="/api/get_user_info?username=" + self.user.username)

        # Check status code and data types
        data = ast.literal_eval(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(type(data), dict)

        # Check the response's content
        self.assertEqual(data["username"], "test_user")
        self.assertEqual(data["first_name"], "test")
        self.assertEqual(data["last_name"], "user")

        # Scenario 2: User looks up someone else's profile
        response = self.client.get(path="/api/get_user_info?username=" + self.user.username + "&target=" + self.user.username)

        data = ast.literal_eval(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)

        self.assertEqual(data["username"], "test_user")
        self.assertEqual(data["first_name"], "test")
        self.assertEqual(data["last_name"], "user")

    def test_get_all_users(self): 
        '''Checking the get_user_info api functionality.'''

        response = self.client.get(path="/api/get_all_users?username=" + self.user.username)

        # Check status code and data types
        data = ast.literal_eval(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(type(data), dict)
        self.assertEqual(type(data["user_list"]), list)
        self.assertEqual(type(data["user_list"][0]), dict)

        # Check whehter the response contains all the needed information
        self.assertIn("user_name", data["user_list"][0].keys())
        self.assertIn("first_name", data["user_list"][0].keys())
        self.assertIn("last_name", data["user_list"][0].keys())
        self.assertIn("last_login", data["user_list"][0].keys())

        # Check the values of the received content
        self.assertEqual("test_user", data["user_list"][0]["user_name"])
        self.assertEqual("test", data["user_list"][0]["first_name"])
        self.assertEqual("user", data["user_list"][0]["last_name"])

    def test_create_post(self): 
        '''Checking the get_user_info api functionality.'''

        prev_post_cnt = len(Post.objects.all())
        response = self.client.post(path="/api/create_post?username=" + self.user.username, data={"title": "title", "body": "body"})

        updated_post_cnt = len(Post.objects.all())
        self.assertEqual(prev_post_cnt + 1, updated_post_cnt)

    def test_get_all_posts(self): 
        '''Checking the get_all_posts api functionality.'''
        
        self.client.post(path="/api/create_post?username=" + self.user.username, data={"title": "title", "body": "body"})
        response = self.client.get(path="/api/get_all_posts?username=" + self.user.username)

        # Check status code and data types
        data = ast.literal_eval(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(type(data), dict)
        self.assertEqual(type(data["post_list"]), list)
        self.assertEqual(type(data["post_list"][0]), dict)

        # Check whehter the response contains all the needed information
        self.assertIn("title", data["post_list"][0].keys())
        self.assertIn("body", data["post_list"][0].keys())
        self.assertIn("author", data["post_list"][0].keys())
        self.assertIn("first_name", data["post_list"][0].keys())
        self.assertIn("last_name", data["post_list"][0].keys())
        self.assertIn("date_created", data["post_list"][0].keys())
        self.assertIn("likes", data["post_list"][0].keys())
        self.assertIn("post_id", data["post_list"][0].keys())
        self.assertIn("image_src", data["post_list"][0].keys())

        # Check the values of the received content
        self.assertEqual("title", data["post_list"][0]["title"])
        self.assertEqual("body", data["post_list"][0]["body"])

    def test_get_user_posts(self): 
        '''Checking the get_user_posts api functionality.'''
        # TODO: VERIFY THAT PULLING SOMEONE ELSE'S POSTS ALSO WORKS!
        
        self.client.post(path="/api/create_post?username=" + self.user.username, data={"title": "title", "body": "body"})
        response = self.client.get(path="/api/get_user_posts?username=" + self.user.username + "&target=" + self.user.username)

        # Check status code and data types
        data = ast.literal_eval(response.content.decode("UTF-8"))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(type(data), dict)
        self.assertEqual(type(data["post_list"]), list)
        self.assertEqual(type(data["post_list"][0]), dict)

        # Check whehter the response contains all the needed information
        self.assertIn("title", data["post_list"][0].keys())
        self.assertIn("body", data["post_list"][0].keys())
        self.assertIn("author", data["post_list"][0].keys())
        self.assertIn("first_name", data["post_list"][0].keys())
        self.assertIn("last_name", data["post_list"][0].keys())
        self.assertIn("date_created", data["post_list"][0].keys())
        self.assertIn("likes", data["post_list"][0].keys())
        self.assertIn("post_id", data["post_list"][0].keys())
        self.assertIn("image_src", data["post_list"][0].keys())

        # Check the values of the received content
        self.assertEqual("title", data["post_list"][0]["title"])
        self.assertEqual("body", data["post_list"][0]["body"])

    def test_delete_post(self): 
        '''Checking the delete_post api functionality.'''

        # Scenario 1: previous_page not provided
        self.client.post(path="/api/create_post?username=" + self.user.username, data={"title": "title", "body": "body"})
        response = self.client.post(path="/api/delete_post?username=" + self.user.username, data = {"post_id": Post.objects.first().post_id, "author": self.user.username})

        self.assertRedirects(response, "/home", 302, 301)
        
        # Scenario 2: previous_page provided
        self.client.post(path="/api/create_post?username=" + self.user.username, data={"title": "title", "body": "body"})
        response = self.client.post(path="/api/delete_post?username=" + self.user.username, data = {"post_id": Post.objects.first().post_id, "previous_page": "/sign-in", "author": self.user.username})

        self.assertRedirects(response, "/sign-in", 302, 200)


    def tearDown(self) -> None:
        '''Cleanup after unit testing.'''
        return super().tearDown()
    

from django.db import models
import random
import string
from django.contrib.auth.models import User

# Create your models here.

def generate_unique_post_id(length):
    while True:
        id = ''.join(random.choices(string.ascii_letters, k = length))
        if Post.objects.filter(post_id = id).count() == 0:
            return id

def generate_unqiue_comment_id(length):
    while True:
        id = ''.join(random.choices(string.ascii_letters, k = length))
        if Comment.objects.filter(post_id = id).count() == 0:
            return id

class Post(models.Model):
    post_id = models.CharField(max_length = 40, unique = True, null = False, primary_key = True, default = generate_unique_post_id)
    title = models.CharField(max_length = 50, null = False, default = "default title")
    body = models.TextField(max_length = 500, null = False)
    author = models.ForeignKey(User, on_delete = models.CASCADE)
    date_created = models.DateField(auto_now_add = True)
    likes = models.IntegerField(default = 0)

class Comment(models.Model):
    post_id = models.ForeignKey(Post, on_delete = models.CASCADE)
    user_id = models.ForeignKey(User, on_delete = models.CASCADE)
    comment_id = models.CharField(max_length = 40, unique = True, null = False, primary_key = True)
    content = models.TextField(max_length = 300, null = False)
    date_created = models.DateField(auto_now_add = True)
    likes = models.IntegerField(default = 0)
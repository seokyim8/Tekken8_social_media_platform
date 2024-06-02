from rest_framework import serializers
from .models import User, Post, Comment

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('user_id', 'password', 'first_name', 'last_name', 'date_created')

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('post_id', 'title', 'body', 'author')
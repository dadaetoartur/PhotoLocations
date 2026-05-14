from rest_framework import serializers
from django.contrib.auth.models import User
from .models import City, Landmark, Comment, UserProfile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name', 'date_joined']


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, min_length=6)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password', 'password2', 'first_name', 'last_name']

    def validate(self, data):
        if data['password'] != data['password2']:
            raise serializers.ValidationError({'password': 'Passwords do not match.'})
        return data

    def create(self, validated_data):
        validated_data.pop('password2')
        user = User.objects.create_user(**validated_data)
        UserProfile.objects.create(user=user)
        return user


class UserProfileSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    comment_count = serializers.SerializerMethodField()

    class Meta:
        model = UserProfile
        fields = ['user', 'avatar_url', 'bio', 'comment_count']

    def get_comment_count(self, obj):
        return obj.user.comments.count()


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)

    class Meta:
        model = Comment
        fields = ['id', 'user', 'text', 'created_at']
        read_only_fields = ['id', 'user', 'created_at']


class LandmarkSerializer(serializers.ModelSerializer):
    comments = CommentSerializer(many=True, read_only=True)
    comment_count = serializers.IntegerField(source='comments.count', read_only=True)

    class Meta:
        model = Landmark
        fields = ['id', 'name', 'description', 'image_url', 'address', 'order', 'comments', 'comment_count']


class CitySerializer(serializers.ModelSerializer):
    landmarks = LandmarkSerializer(many=True, read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'slug', 'description', 'hero_image_url', 'landmarks']


class CityListSerializer(serializers.ModelSerializer):
    landmark_count = serializers.IntegerField(source='landmarks.count', read_only=True)

    class Meta:
        model = City
        fields = ['id', 'name', 'slug', 'description', 'hero_image_url', 'landmark_count']

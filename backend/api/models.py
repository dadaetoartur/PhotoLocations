from django.db import models
from django.contrib.auth.models import User


class City(models.Model):
    name = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    description = models.TextField()
    hero_image_url = models.URLField(blank=True)

    def __str__(self):
        return self.name

    class Meta:
        verbose_name_plural = 'cities'


class Landmark(models.Model):
    city = models.ForeignKey(City, on_delete=models.CASCADE, related_name='landmarks')
    name = models.CharField(max_length=200)
    description = models.TextField()
    image_url = models.URLField()
    address = models.CharField(max_length=300, blank=True)
    order = models.PositiveIntegerField(default=0)

    def __str__(self):
        return f'{self.city.name} – {self.name}'

    class Meta:
        ordering = ['order']


class Comment(models.Model):
    landmark = models.ForeignKey(Landmark, on_delete=models.CASCADE, related_name='comments')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='comments')
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.user.username} on {self.landmark.name}'

    class Meta:
        ordering = ['-created_at']


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    avatar_url = models.URLField(blank=True)
    bio = models.TextField(blank=True)

    def __str__(self):
        return f'Profile of {self.user.username}'

from django.contrib import admin
from .models import City, Landmark, Comment, UserProfile

@admin.register(City)
class CityAdmin(admin.ModelAdmin):
    list_display = ['name', 'slug']
    prepopulated_fields = {'slug': ('name',)}

@admin.register(Landmark)
class LandmarkAdmin(admin.ModelAdmin):
    list_display = ['name', 'city', 'order']
    list_filter = ['city']

@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ['user', 'landmark', 'created_at']

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ['user']

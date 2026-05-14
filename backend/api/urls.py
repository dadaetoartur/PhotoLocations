from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from . import views

urlpatterns = [
    path('auth/register/', views.RegisterView.as_view(), name='register'),
    path('auth/login/', views.LoginView.as_view(), name='login'),
    path('auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('auth/me/', views.MeView.as_view(), name='me'),
    path('cities/', views.CityListView.as_view(), name='city-list'),
    path('cities/<slug:slug>/', views.CityDetailView.as_view(), name='city-detail'),
    path('landmarks/<int:landmark_id>/comments/', views.CommentCreateView.as_view(), name='comment-create'),
    path('comments/<int:pk>/', views.CommentDeleteView.as_view(), name='comment-delete'),
]

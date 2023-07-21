from django.urls import path

from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('cars/', views.getNotes, name="cars"),
    path('cars/create/', views.createNote, name="create-cars"),
    path('cars/<str:pk>/update/', views.updateNote, name="update-car"),
    path('cars/<str:pk>/delete/', views.deleteNote, name="delete-car"),
    path('cars/<str:pk>/', views.getNote, name="car"),
]
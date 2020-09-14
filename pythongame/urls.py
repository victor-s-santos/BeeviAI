from django.contrib import admin
from django.urls import path, include
from core import views as core_v
from register import views as register_v
from game import views as game_v

urlpatterns = [
    path('', core_v.index, name='home'),
    #cadastro de usuário
    path('register/', register_v.register, name='register'),
    #login
    path('', include('django.contrib.auth.urls')),
    
    #game
    path('game/', game_v.play, name='game'),
    path('admin/', admin.site.urls),
]

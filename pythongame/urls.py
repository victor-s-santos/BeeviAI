from django.contrib import admin
from django.urls import path, include
from core import views as core_v
from register import views as register_v
from game import views as game_v
from rank import views as rank_v
from django.conf.urls import url

urlpatterns = [
    path('', core_v.index, name='home'),
    #cadastro de usuário
    path('register/', register_v.register, name='register'),
    #login
    path('', include('django.contrib.auth.urls')),
    
    #game
    path('game/', game_v.play, name='game'),
    #inserir o recorde
    url(r'game/insert$', game_v.insert, name='insert'),

    #rank do jogo
    path('rank/', rank_v.score, name='rank'),
    path('admin/', admin.site.urls),
]

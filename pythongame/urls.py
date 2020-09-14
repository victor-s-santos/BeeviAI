from django.contrib import admin
from django.urls import path, include
from core import views as core_v
from register import views as register_v

urlpatterns = [
    path('', core_v.index, name='home'),
    #cadastro de usuário
    path('register/', register_v.register, name='register'),
    #login
    path('', include('django.contrib.auth.urls')),
    path('admin/', admin.site.urls),
]

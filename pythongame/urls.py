from django.contrib import admin
from django.urls import path
from core import views as core_v

urlpatterns = [
    path('', core_v.index, name='home'),
    path('admin/', admin.site.urls),
]

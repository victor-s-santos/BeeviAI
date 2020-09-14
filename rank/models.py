from django.contrib.auth.models import User
from django.db import models
from django.utils import timezone


class Pontuacao(models.Model):
    usuario = models.OneToOneField(User, on_delete = models.CASCADE)
    score = models.IntegerField()
    data_da_partida = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'Partida'
        verbose_name_plural = 'Partidas'

    def __str__(self):
        return self.usuario.username
# Create your models here.

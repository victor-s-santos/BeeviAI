from django.conf import settings
from django.db import models
from django.utils import timezone


class Pontuacao(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    score = models.IntegerField()
    data_da_partida = models.DateField(auto_now_add=True)

    class Meta:
        verbose_name = 'Partida'
        verbose_name_plural = 'Partidas'

    def __str__(self):
        return self.user.username
# Create your models here.

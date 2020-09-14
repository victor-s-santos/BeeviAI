from django.contrib import admin
from .models import Pontuacao

class PontuacaoAdmin(admin.ModelAdmin):
    date_hierarchy = 'data_da_partida'
    list_display = ['usuario', 'score', 'data_da_partida']
    search_fields = ['usuario', 'score', 'data_da_partida']
    list_filter = ['usuario', 'score', 'data_da_partida']

admin.site.register(Pontuacao, PontuacaoAdmin)
# Register your models here.

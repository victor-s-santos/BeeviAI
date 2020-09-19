from django.shortcuts import render, redirect
from django.contrib.auth.decorators import login_required
from rank.models import Pontuacao


@login_required(login_url='/login')
def play(request):
    return render(request, 'game/play.html')

def insert(request):
    """Must insert the game records to the database"""
    pontuacoes = Pontuacao(user=request.user, score=request.POST['score'])
    pontuacoes.save()
    return redirect('home')


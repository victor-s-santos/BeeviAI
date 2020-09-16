from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from rank.models import Pontuacao

@login_required(login_url='/login')
def play(request):
    return render(request, 'game/play.html')

def insert(request):
    pontuacoes = Pontuacao(user=request.user, score=request.POST['score'])
    pontuacoes.save()
    return redirect('game')
# Create your views here.

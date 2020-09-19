from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .models import Pontuacao

@login_required(login_url='/login')
def score(request):
    scores = Pontuacao.objects.all().order_by('score')
    return render(request, 'rank.html', {'scores': scores})
# Create your views here.

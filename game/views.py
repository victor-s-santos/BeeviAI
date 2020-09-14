from django.shortcuts import render
from django.contrib.auth.decorators import login_required
from .utils.Game import * 

@login_required(login_url='/login')
def play(request):
    return render(request, 'game/play.html')
# Create your views here.

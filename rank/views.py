from django.shortcuts import render

def score(request):
    return render(request, 'score/rank.html')
# Create your views here.

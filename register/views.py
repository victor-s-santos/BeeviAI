from django.shortcuts import render, redirect
from django.contrib.auth import login, authenticate
from django.contrib import messages
#from django.contrib.auth.forms import UserCreationForm
from .forms import RegisterForm

# Create your views here.
def register(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            messages.success(request, 'Usuário cadastrado com sucesso! Por favor, faça o Login para poder utilizar o sistema.')
            form.save()
            return redirect('register')
    else:
        form = RegisterForm()
    return render(request, 'register/register.html', {"form": form})
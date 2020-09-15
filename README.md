# BeeviAI
- In this project I am going to develop a web python game.

# About
- My first idea was to create a  python game using pygame and render this game in html page by a django application;
- However, this not a good way because it is necessary to compile the python game to javascript game, and the game isn't going to have a good performance;
- So I decided to develop the game using javascript.  

# How to Run:
* Create a virtualenv using python 3x and in a linux enviorement:
  - python -m venv .venv

* Active this enviorement:
  - source .venv/bin/activate

* Clone this repository:
  - git clone https://github.com/victor-s-santos/BeeviAI.git
  
* Install dependencies:
  - cd BeeviAI `to get in the repository folder`
  - pip install -r requeriments.txt
  
* Run the server:
  - python manage.py runserver
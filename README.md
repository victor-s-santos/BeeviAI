# BeeviAI
- In this project I am going to develop a web python game.
- Each record is pushed in the database, as long as the user has reached the end of the maze.

# About
- My first idea was to create a  python game using pygame and render this game in html page by a django application;
- However, this not a good way because it is necessary to compile the python game to javascript game, and the game isn't going to have a good performance;
- So I decided to implement the game using html5, css and javascript.  
- The game source can be found here(https://code-projects.org/ -> https://code-projects.org/maze-game-in-html5-javascript-with-source-code/)

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
  
* Run the tests:
  - python manage.py tests
  
* Run the server:
  - python manage.py runserver
  
 # How it works?
 1. __You need to create an user to play the game__;
  - The register app uses built in model to create the user;
  - The game and score paths are allowed to authorized users only;
 2. __This user is going to be used to assign the score to the user__;
  - Once the user could reach to the end of the maze, the user score is going to be saved in the database;
 3. __The game has been implemented using html5, css and javascript__;
  - I've take the source game and put it as static file;
 4. __Game records values are commited in sql database__;
  - A Jquery/Ajax function and a views function are ran to insert the values in the database;
 5. __The game records__;
  - It is possible to see the users records, once you are logged in, accessing the rank url.
  
 
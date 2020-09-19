var modal = document.getElementById('myModal');

var span = document.getElementsByClassName("close")[0];

modelfungo = function() {
    modal.style.display = "block";
    x = document.querySelector("#gamehead");
    x.textContent = "Fim de Jogo!Mais sorte na próxima."

}

modelfunwin = function() {
    modal.style.display = "block";
    x = document.querySelector("#gamehead");
    x.textContent = "Parabéns, você venceu!"

}

document.getElementById("demo").addEventListener("click", myFunction);
//retornando o usuário a home page
function myFunction() {
    window.location = "/";
}

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}


function startTimer(duration, display) {
    var start = Date.now(),
        diff,
        minutes,
        seconds;

    function timer() {
        if(playing) {
            diff = duration - (((Date.now() - start) / 1000) | 0);
            seconds = (diff % 60) | 0;
            seconds = seconds < 10 ? "0" + seconds : seconds;
            display.textContent = `Atenção com o tempo: ${seconds}`;

            if (diff <= 0) {
                display.textContent = "Fim de Jogo";
                start = Date.now() + 1000;
                playing = false
                modelfungo();
            }
        }
    };
    timer();
    setInterval(timer,1000)
}

window.onload = function () {
    halfminute = 30;
    x = document.querySelector("#timerel");
    startTimer(halfminute,x)
}
playing = true
window.addEventListener('keydown',doKeyDown,true);

function doKeyDown(evt)
{
    var handled = false;
    if (playing) {
        switch (evt.keyCode) {
            case 38:  /* Seta para cima */
                m.moveup("canvas");
                handled = true
                break;
            case 87:  /* Tecla W */
                m.moveup("canvas");
                handled = true
                break;
            case 40 :  /* Seta para baixo */
                m.movedown("canvas");
                handled = true
                break;
            case 83 :  /* Tecla S */
                m.movedown("canvas");
                handled = true
                break;
            case 37:  /* Seta para a esquerda */
                m.moveleft("canvas");
                handled = true
                break;
            case 65:  /* Tecla A */
                m.moveleft("canvas");
                handled = true
                break;
            case 39:  /* Seta para a direita */
                m.moveright("canvas");
                handled = true
                break;
            case 68:  /* Tecla D */
                m.moveright("canvas");
                handled = true
                break;
        }
        if (m.checker("canvas"))
            playing = false

    }
    if (handled)
        evt.preventDefault();
}


var dsd = function (size) {
    this.N = size;
    this.P = new Array(this.N);
    this.R = new Array(this.N);

    this.init = function () {
        for (var i = 0; i < this.N; i++) {
            this.P[i] = i;
            this.R[i] = 0;
        }
    }

    this.union = function (x, y) {
        var u = this.find(x);
        var v = this.find(y);
        if (this.R[u] > this.R[v]) {
            this.R[u] = this.R[v] + 1;
            this.P[u] = v;
        }
        else {
            this.R[v] = this.R[u] + 1;
            this.P[v] = u;
        }
    }

    this.find = function (x) {
        if (x == this.P[x])
            return x;
        this.P[x] = this.find(this.P[x]);
        return this.P[x];
    }
};

function random(min, max)      { return (min + (Math.random() * (max - min)));            };
function randomChoice(choices) { return choices[Math.round(random(0, choices.length-1))]; };

var maze = function (X, Y) {
    this.N = X;
    this.M = Y;
    this.S = 25;
    this.moves = 0;
    this.Board = new Array(2 * this.N + 1);
    this.EL = new Array();
    this.vis = new Array(2 * this.N + 1);
    this.delay = 2;
    this.x = 1;
    this.init = function () {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            this.Board[i] = new Array(2 * this.M + 1);
            this.vis[i] = new Array(2 * this.M + 1);
        }

        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (!(i % 2) && !(j % 2)) {
                    this.Board[i][j] = '+';
                }
                else if (!(i % 2)) {
                    this.Board[i][j] = '-';
                }
                else if (!(j % 2)) {
                    this.Board[i][j] = '|';
                }
                else {
                    this.Board[i][j] = ' ';
                }
                this.vis[i][j] = 0;
            }
        }
    }


    this.add_edges = function () {
        for (var i = 0; i < this.N; i++) {
            for (var j = 0; j < this.M; j++) {
                if (i != this.N - 1) {
                    this.EL.push([[i, j], [i + 1, j], 1]);
                }
                if (j != this.M - 1) {
                    this.EL.push([[i, j], [i, j + 1], 1]);
                }
            }
        }
    }


    this.h = function (e) {
        return e[1] * this.M + e[0];
    }
    this.randomize = function (EL) {
        for (var i = 0; i < EL.length; i++) {
            var si = Math.floor(Math.random() * 387) % EL.length;
            var tmp = EL[si];
            EL[si] = EL[i];
            EL[i] = tmp;
        }
        return EL;
    }

    this.breakwall = function (e) {
        var x = e[0][0] + e[1][0] + 1;
        var y = e[0][1] + e[1][1] + 1;
        this.Board[x][y] = ' ';
    }

    this.gen_maze = function () {
        this.EL = this.randomize(this.EL);
        var D = new dsd(this.M * this.M);
        D.init();
        var s = this.h([0, 0]);
        var e = this.h([this.N - 1, this.M - 1]);
        this.Board[1][0] = ' ';
        this.Board[2 * this.N - 1][2 * this.M] = ' ';
        for (var i = 0; i < this.EL.length; i++) {
            var x = this.h(this.EL[i][0]);
            var y = this.h(this.EL[i][1]);
            if (D.find(s) == D.find(e)) {
                if (!(D.find(x) == D.find(s) && D.find(y) == D.find(s))) {
                    if (D.find(x) != D.find(y)) {
                        D.union(x, y);
                        this.breakwall(this.EL[i]);
                        this.EL[i][2] = 0;
                    }

                }
            }

            else if (D.find(x) != D.find(y)) {
                D.union(x, y);
                this.breakwall(this.EL[i]);
                this.EL[i][2] = 0;
            }
            else {
                continue;
            }
        }

    };


    this.draw_canvas = function (id) {
        this.canvas = document.getElementById(id);
        var scale = this.S;
        temp = []
        if (this.canvas.getContext) {
            this.ctx = this.canvas.getContext('2d');
            this.Board[1][0] = '$'
            for (var i = 0; i < 2 * this.N + 1; i++) {
                for (var j = 0; j < 2 * this.M + 1; j++) {
                    if (this.Board[i][j] != ' '){
                        this.ctx.fillStyle = "#0b052d";
                        this.ctx.fillRect(scale * i, scale * j, scale, scale);
                    }
                    else if(i<5 && j <5)
                        temp.push([i,j])
                    }
            }
            x = randomChoice(temp)
            this.Board[x[0]][x[1]] = '&'
            this.ctx.fillStyle = "#c4192a";
            this.ctx.fillRect(scale* x[0], scale * x[1], scale, scale);
        }
    };

    this.checkPos = function (id) {
        for (var i = 0; i < 2 * this.N + 1; i++) {
            for (var j = 0; j < 2 * this.M + 1; j++) {
                if (this.Board[i][j] == '&') {
                    return [i,j]
                }
            }
        }
    }

    this.moveclear = function (a,b) {
        var scale = this.S;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#e27158";
        this.ctx.fillRect(scale * a, scale * b, scale, scale);
        this.Board[a][b] = ' '
    }

    this.move =  function (a,b) {
        var scale = this.S;
        this.ctx = this.canvas.getContext('2d');
        this.ctx.fillStyle = "#c4192a";
        this.ctx.fillRect(scale * a, scale * b, scale, scale);
        this.Board[a][b] = '&'
    }

    this.moveup = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        j -= 1
        if (j < 0)
            return
        else if (j > 2 * this.M)
            return
        else if (this.Board[i][j] == ' ') {
            this.moveclear(i,j+1);
            this.move(i,j);
            this.moves+=1;}
        else
            return
    }

    this.movedown = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        j+=1
        if(j<0)
            return
        else if(j>2*this.M)
            return
        else if(this.Board[i][j] ==' ') {
            this.moveclear(i,j-1);
            this.move(i,j);
            this.moves+=1;}
        else
            return
    }

    this.moveleft = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        i-=1
        if(i<0)
            return
        else if(i>2*this.N)
            return
        else if(this.Board[i][j] ==' ') {
            this.moveclear(i+1,j);
            this.move(i,j);
            this.moves+=1;}
        else
            return
    }

    this.moveright = function (id) {
        cord = this.checkPos(id);
        var scale = this.S;
        i = cord[0]
        j = cord[1]
        i+=1
        if(i<0)
            return
        else if(i>2*this.N)
            return
        else if(this.Board[i][j] ==' ') {
            this.moveclear(i-1,j);
            this.move(i,j);
            this.moves+=1;}
        else
            return
    }
    this.checker = function (id) {
        cord = this.checkPos(id);
        i = cord[0]
        j = cord[1]
        if ((i == 19 && j== 20) || (i==1 && j==0)) {
            modelfunwin();
            return 1
        }
        return 0
    }

    this.getMoves = function () {
        return this.moves;
    }

};

m = new maze(10 , 10);
m.init();
m.add_edges();
m.gen_maze();
m.draw_canvas("canvas");
function drawMoves() {
    document.getElementById("c").innerHTML = "Passos realizados: "+ m.getMoves()
}
setInterval(drawMoves, 100);
//token necessário para validar o post
function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}
var csrftoken = getCookie('csrftoken');


//jquery para realizar o post
$(document).ready(function(){
    $('#demo').on('click', function(){
        $user = $('#printuser').text();
        $score = parseInt(m.getMoves(), 10);
        // alert($score)
        if($user == "" || $score == ""){
            alert("Nenhum valor foi registrado!");
        }else{
            $.ajax({
                headers: { "X-CSRFToken": csrftoken },
                type: "POST",
                url: "insert",
                data:{
                    user: $user,
                    score: $score,
                    csrfmiddlewaretoken: $('input[name=csrfmiddlewaretoken]').val()
                },
            });
        }
    });
});
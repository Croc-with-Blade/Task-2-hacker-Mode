var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var x = canvas.width / 2;
var radius = canvas.height / 45;
var y = canvas.height - radius;
var value = 5;
var dy = 5;
var particleArray = [];
var sound = 0;
var lWidth = innerHeight / 60;

var colorArray = [
    '#efa8e4',
    '#0779e4',
    '#d8345f',
    '#f2ed6f',
    '#00bdaa'
];

var colorqwe = ['#FF6633', '#FFB399', '#FF33FF', '#FFFF99', '#00B3E6',
    '#E6B333', '#3366E6', '#999966', '#99FF99', '#B34D4D',
    '#80B300', '#809900', '#E6B3B3', '#6680B3', '#66991A',
    '#FF99E6', '#CCFF1A', '#FF1A66', '#E6331A', '#33FFCC',
    '#66994D', '#B366CC', '#4D8000', '#B33300', '#CC80CC',
    '#66664D', '#991AFF', '#E666FF', '#4DB3FF', '#1AB399',
    '#E666B3', '#33991A', '#CC9999', '#B3B31A', '#00E680',
    '#4D8066', '#809980', '#E6FF80', '#1AFF33', '#999933',
    '#FF3380', '#CCCC00', '#66E64D', '#4D80CC', '#9900B3',
    '#E64D66', '#4DB380', '#FF4D4D', '#99E6E6', '#6666FF'
];

var color = [
    'yellow',
    'red',
    'blue',
    'green'
];

function shuffle(array) {
    var currentIndex = array.length,
        temporaryValue, randomIndex;

    // While there remain elements to shuffle...
    while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

function randomInteger(min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}



document.addEventListener("mousedown", mousePress);
document.addEventListener("keydown", mousePress);


function mousePress() {
    ball.value = 0;
    if (sound === 0) {
        playSound('click');
        sound++;
    }
}

document.addEventListener("mouseup", mouseUp);
document.addEventListener("keyup", mouseUp);

function mouseUp() {
    ball.value = 1;
    ball.dy = 5;
    sound = 0;
}



window.addEventListener('resize', function() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    x = canvas.width / 2;
    y = canvas.height - radius;

    init();
});

function Ball(x, y, radius, dy, value) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.value = value;
    this.dy = dy;

    this.drawB = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = "yellow";
        c.fill();
    }

    this.updateB = function() {

        if (this.value === 0) {

            if (this.y <= innerHeight * 1 / 2) {
                this.dy = 0;
                moveFrame();
            } else {
                this.dy = dy;
                this.y -= this.dy;
            }

        } else if (this.value === 1) {

            if (this.y < y) {

                this.y += this.dy;
                this.dy += 0.1;


            } else if (this.y >= y) {
                this.dy = 0;
                this.y = y;
            }
        }

        this.drawB();
    }


}

function moveFrame() {
    for (let k = 0; k < obstacle.length; k++) {
        obstacle[k].y += 5;
    }
    for (let q = 0; q < colorChange.length; q++) {
        colorChange[q].y = (obstacle[q].y - obstacle[q + 1].y) / 2 + obstacle[q + 1].y;
    }
}

function Obstacle(x, y, radius, arcs) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.arcs = arcs;
    this.dir = Math.round(Math.random());

    this.drawO = function(index) {
        let theta = 0;
        for (let r = 0; r < this.arcs; r++) {
            c.beginPath();
            c.lineWidth = lWidth;
            c.strokeStyle = color[r];
            /* if (this.dir) {*/
            c.arc(this.x, this.y, this.radius, theta + index, ((Math.PI * 2) / this.arcs) + theta + index, false);
            /* } else {
                 c.arc(this.x, this.y, this.radius, theta + index, ((Math.PI * 2) / this.arcs) + theta + index, true);
             }*/
            c.stroke();
            c.closePath();
            theta += Math.PI * 2 / this.arcs;
        }

    }

    this.updateO = function(index) {

        this.drawO(index);
    }

}

function BallChange(x, y, color) {

    this.x = x;
    this.y = y;
    this.color = color;

    this.draw = function() {
        c.beginPath();
        c.lineWidth = 15;
        c.strokeStyle = 'yellow';
        c.arc(this.x, this.y, 8, 0, (Math.PI * 2) / 4, false);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.lineWidth = 15;
        c.strokeStyle = 'green';
        c.arc(this.x, this.y, 8, (Math.PI * 2) / 4, (Math.PI * 2) / 2, false);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.lineWidth = 15;
        c.strokeStyle = 'blue';
        c.arc(this.x, this.y, 8, (Math.PI * 2) / 2, (Math.PI * 2) * 3 / 4, false);
        c.stroke();
        c.closePath();

        c.beginPath();
        c.lineWidth = 15;
        c.strokeStyle = 'red';
        c.arc(this.x, this.y, 8, (Math.PI * 2) * 3 / 4, (Math.PI * 2), false);
        c.stroke();
        c.closePath();
    }

    this.update = function() {
        this.draw();
    }


}



var ball;
var obstacle;
var coloChange;
var noArcs;
var boo;

function init() {

    obstacle = [];
    colorChange = [];
    ball = new Ball(x, y, radius, dy, value);

    for (let i = 0; i < 150; i++) {

        noArcs = Math.floor(Math.random() * 3) + 2;

        obstacle.push(new Obstacle(x, innerHeight / 4 - i * (innerHeight / 2), innerHeight / 8, noArcs));

    }

    for (let t = 0; t < 149; t++) {
        colorChange.push(new BallChange(x, (obstacle[t].y - obstacle[t + 1].y) / 2 + obstacle[t + 1].y, color[randomInteger(0, obstacle[t + 1].arcs - 1)]));

    }

}


let index = 0;
var pixelData;
var ballData;
var render;
var dummy = 1;
var score = 0;

var hScore = JSON.parse(localStorage.getItem("highScore"));

function startGame() {

    render = setInterval(function() {
        c.clearRect(0, 0, innerWidth, innerHeight);

        for (let j = 0; j < obstacle.length - 1; j++) {
            obstacle[j].updateO(index);
            /*colorChange[j].update();*/

            if (ball.y - radius <= obstacle[j].y + innerHeight / 8 + lWidth / 2 && ball.y + radius >= obstacle[j].y + innerHeight / 8 - lWidth / 2) {

                pixelData = c.getImageData(x, obstacle[j].y + innerHeight / 8, x + 1, obstacle[j].y + innerHeight / 8 + 1);
                ballData = c.getImageData(x, ball.y, x + 1, ball.y + 1);
                console.log(ballData);

                if (pixelData.data[0] === 255 && pixelData.data[1] === 255 && pixelData.data[2] === 0) {

                    if (dummy === 0) {
                        score++;
                        playSound('score');
                        dummy = 1;
                    }
                    /* continue;*/

                } else {
                    clearInterval(render);
                    initP();
                    animate();
                    playSound('bell');
                    document.getElementById('canvas').classList.add('game-over');
                    document.getElementById('over').style.display = 'block';
                    document.querySelector('.pause').style.display = 'none';

                    if (hScore === null) {
                        localStorage.setItem("highScore", JSON.stringify(score));
                        document.getElementById('highScore').innerHTML = 'High Score: ' + score;
                    } else {
                        if (hScore >= score) {
                            document.getElementById('highScore').innerHTML = 'High Score: ' + hScore;
                        } else {
                            localStorage.setItem("highScore", JSON.stringify(score));
                            document.getElementById('highScore').innerHTML = 'High Score: ' + score;
                        }
                    }

                }



            } else if (ball.y - radius <= obstacle[j].y - innerHeight / 8 + lWidth / 2 && ball.y + radius >= obstacle[j].y - innerHeight / 8 - lWidth / 2) {

                pixelData = c.getImageData(x, obstacle[j].y - innerHeight / 8, x + 1, obstacle[j].y + innerHeight / 8 + 1);
                ballData = c.getImageData(x, ball.y, x + 1, ball.y + 1);
                if (pixelData.data[0] === 255 && pixelData.data[1] === 255 && pixelData.data[2] === 0) {
                    if (dummy === 0) {
                        score++;
                        playSound('score');
                        document.getElementById('score').innerHTML = 'Score: ' + score;
                        dummy = 1;
                    }
                    /*continue;*/

                } else {
                    clearInterval(render);
                    initP();
                    animate();
                    playSound('bell');
                    document.getElementById('canvas').classList.add('game-over');
                    document.getElementById('over').style.display = 'block';

                    if (hScore === null) {
                        localStorage.setItem("highScore", JSON.stringify(score));
                        document.getElementById('highScore').innerHTML = 'High Score: ' + score;
                    } else {
                        if (hScore >= score) {
                            document.getElementById('highScore').innerHTML = 'High Score: ' + hScore;
                        } else {
                            localStorage.setItem("highScore", JSON.stringify(score));
                            document.getElementById('highScore').innerHTML = 'High Score: ' + score;
                        }
                    }
                }


            } else if ((ball.y < obstacle[j].y + innerHeight / 32 && ball.y > obstacle[j].y - innerHeight / 32)) {

                dummy = 0;
            }
        }
        ball.updateB();
        index += Math.PI / 180;
        console.log(score);

    }, 12);

}


init();
startGame();

function initP() {
    for (let g = 0; g < 80; g++) {

        var x = ball.x;
        var y = ball.y;
        var dx = (Math.random() - 0.5) * 20;
        var dy = (Math.random() - 0.5) * 20;
        var radius = canvas.height / 135;

        particleArray.push(new Particle(x, y, radius, dx, dy));

    }
}


function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (let m = 0; m < obstacle.length; m++) {
        obstacle[m].updateO(index);
    }

    for (let j = 0; j < particleArray.length; j++) {
        particleArray[j].update();
    }
}



function Particle(x, y, radius, dx, dy) {

    this.x = x;
    this.y = y;
    this.radius = radius;
    this.dx = dx;
    this.dy = dy;
    this.color = colorArray[Math.floor(Math.random() * 5)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > (innerWidth) || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > (innerHeight) || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        this.draw();
    }
}

document.querySelector('.pause').addEventListener('click', pauseHandle);
console.log(document.querySelector('.pause'));

function pauseHandle() {
    clearInterval(render);
    document.getElementById('canvas').classList.add('game-over');
    document.getElementById('pause').style.display = 'block';
    document.querySelector('.pause').removeEventListener('click', pauseHandle);
    document.removeEventListener("mousedown", mousePress);
    document.removeEventListener("keydown", mousePress);
    document.removeEventListener("mouseup", mouseUp);
    document.removeEventListener("keyup", mouseUp);

    document.getElementById('play').addEventListener('click', function() {
        startGame();
        document.querySelector('.pause').addEventListener('click', pauseHandle);
        document.getElementById('pause').style.display = 'none';
        document.getElementById('canvas').classList.remove('game-over');
        document.addEventListener("mousedown", mousePress);
        document.addEventListener("keydown", mousePress);
        document.addEventListener("mouseup", mouseUp);
        document.addEventListener("keyup", mouseUp);

    });
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}
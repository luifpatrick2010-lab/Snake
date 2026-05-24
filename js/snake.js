"strict mode";
document.getElementById("idbutton").addEventListener("click", gameStart);


const lastScore = document.getElementById("lastScore");
const highscore = document.getElementById("highscore");
const surviveTime = document.getElementById("surviveTime");

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

const box = 30;
let direction = "right";

let snake = [{x: 250, y: 250}]

function moveSnake() {
    let headX = snake[0].x;
    let headY = snake[0].y;

    if(direction === "right") {
        headX += box;
    }

    if(direction === "left") {
        headX -= box;
    }

    if(direction === "up") {
        headY -= box;
    }

    if(direction === "down") {
        headY += box;
    }

    let newHead = {
        x: headX,
        y: headY
    }

    snake.unshift(newHead);

    snake.pop;
}

function drawSnake() {
    ctx.fillStyle = "green";
    for(let i = 0; i < snake.length; i++) {
        ctx.fill(snake[i].x, snake[i].y, box, box);
    }
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    moveSnake();

    drawSnake();
}

function gameStart() {
    setInterval(drawGame, 100);
}
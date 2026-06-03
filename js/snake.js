"use strict";

window.onload = function () {

    const lastScore = document.getElementById("lastScore");
    const highscore = document.getElementById("highscore");

    const snakeBox = document.getElementById("game");
    const ctx = snakeBox.getContext("2d");

    const retryButton = document.getElementById("retryButton");
    const gameOverScreen = document.getElementById("gameOverScreen");

    const box = 50;

    snakeBox.width = box * 16;
    snakeBox.height = box * 16;

    const appleImage = new Image();
    appleImage.src = "./images/apple.png";

    let direction = "right";

    let snake = [
        { x: 400, y: 400 }
    ];

    let apple = {
        x: Math.floor(Math.random() * (snakeBox.width / box)) * box,
        y: Math.floor(Math.random() * (snakeBox.height / box)) * box
    };

    let game;

    document.getElementById("idbutton").addEventListener("click", function () {

        document.getElementById("idbutton").style.display = "none";
        document.getElementById("startscreen").remove();

        document.getElementById("gamescreen").style.display = "flex";

        gameStart();
    });

    retryButton.addEventListener("click", restart);

    function gameStart() {

        if (game) {
            clearInterval(game);
        }

        game = setInterval(drawGame, 100);
    }

    function moveSnake() {

        let headX = snake[0].x;
        let headY = snake[0].y;

        if (direction === "right") {
            headX += box;
        }

        else if (direction === "left") {
            headX -= box;
        }

        else if (direction === "up") {
            headY -= box;
        }

        else if (direction === "down") {
            headY += box;
        }

        const newHead = {
            x: headX,
            y: headY
        };

        snake.unshift(newHead);

        if (headX === apple.x && headY === apple.y) {

            apple = {
                x: Math.floor(Math.random() * (snakeBox.width / box)) * box,
                y: Math.floor(Math.random() * (snakeBox.height / box)) * box
            };

        } else {

            snake.pop();
        }
    }

    function drawSnake() {

        for (let i = 0; i < snake.length; i++) {

            ctx.fillStyle = "blue";

            ctx.fillRect(
                snake[i].x,
                snake[i].y,
                box,
                box
            );
        }
    }

    function drawApple() {

        ctx.drawImage(
            appleImage,
            apple.x,
            apple.y,
            box,
            box
        );
    }

    function drawBoard() {

    for (let row = 0; row < snakeBox.height / box; row++) {

        for (let col = 0; col < snakeBox.width / box; col++) {

            if ((row + col) % 2 === 0) {
                ctx.fillStyle = "#3d8b3d";
            } else {
                ctx.fillStyle = "#2f6b2f";
            }

            ctx.fillRect(
                col * box,
                row * box,
                box,
                box
            );
        }
    }
}

function drawGame() {

    ctx.clearRect(
        0,
        0,
        snakeBox.width,
        snakeBox.height
    );

    drawBoard();

    moveSnake();

    if (checkCollision()) {

        clearInterval(game);

        gameOverScreen.style.display = "flex";

        return;
    }

    drawApple();
    drawSnake();
}

    document.addEventListener("keydown", changeDirection);

    function changeDirection(event) {

        if (
            (event.key === "ArrowRight" || event.key === "d")
            && direction !== "left"
        ) {
            direction = "right";
        }

        else if (
            (event.key === "ArrowLeft" || event.key === "a")
            && direction !== "right"
        ) {
            direction = "left";
        }

        else if (
            (event.key === "ArrowUp" || event.key === "w")
            && direction !== "down"
        ) {
            direction = "up";
        }

        else if (
            (event.key === "ArrowDown" || event.key === "s")
            && direction !== "up"
        ) {
            direction = "down";
        }
    }

    function checkCollision() {

        let head = snake[0];

        if (head.x < 0 || head.x >= snakeBox.width) {
            return true;
        }

        if (head.y < 0 || head.y >= snakeBox.height) {
            return true;
        }

        return false;
    }

    function restart() {

        snake = [
            { x: 400, y: 400 }
        ];

        apple = {
            x: Math.floor(Math.random() * (snakeBox.width / box)) * box,
            y: Math.floor(Math.random() * (snakeBox.height / box)) * box
        };

        direction = "right";

        ctx.clearRect(0, 0, snakeBox.width, snakeBox.height);

        gameOverScreen.style.display = "none";

        gameStart();
    }
};

function impress() {
    document.querySelector(".impressum").style.display = "flex";

}

function closeImpress() {
    const el = document.querySelector(".impressum");
    if (el) el.style.display = "none";
}

document.getElementById("edit").addEventListener("click", openSettings);

function openSettings() {

    document.querySelector(".backshadow").style.display = "none";

    document.getElementById("settings").style.display = "flex";
}

function closeSettings() {

    document.getElementById("settings").style.display = "none";

    document.querySelector(".backshadow").style.display = "block";
}
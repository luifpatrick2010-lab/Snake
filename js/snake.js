"use strict";

// Warten bis HTML komplett geladen ist
window.onload = function () {

    const lastScore = document.getElementById("lastScore");
    const highscore = document.getElementById("highscore");
    const snakeBox = document.getElementById("game");
    const ctx = snakeBox.getContext("2d");
    const box = 30;
    let direction = "right";
    let snake = [
        { x: 250, y: 250 }
    ];
    let game;


    // Spiel starten
    function gameStart() {

        if (game) {
            clearInterval(game);
        }
        game = setInterval(drawGame, 100);
    }


    // Button
    document.getElementById("idbutton").addEventListener("click", function () {

        // Button verstecken
        document.getElementById("idbutton").style.display = "none";
        document.getElementById("startscreen").remove();

        // Canvas anzeigen
        document.getElementById("gamescreen").style.display = "flex";

        gameStart();
    });


    // Schlange bewegen
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
        snake.pop();
    }
    // Schlange zeichnen
    function drawSnake() {

        for (let i = 0; i < snake.length; i++) {
            ctx.fillStyle = "green";
            ctx.fillRect(
                snake[i].x,
                snake[i].y,
                box,
                box
            );
        }
    }


    // Spiel zeichnen
    function drawGame() {
        ctx.clearRect(0, 0, snakeBox.width, snakeBox.height);
        moveSnake();

        if (checkCollision()) {
            clearInterval(game);
            alert("Game Over!");
            return;
    }
        drawSnake();
    }


    // Tastatursteuerung
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
    // links oder rechts raus
    if (head.x < 0 || head.x >= snakeBox.width) {
        return true;
    }

    // oben oder unten raus
    if (head.y < 0 || head.y >= snakeBox.height) {
        return true;
    }
    return false;
}


};



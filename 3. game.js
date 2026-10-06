let player;
let enemies;
let score = 0;
let speed = 5;
let playerX = 205;
let gameRunning = false;

let keys = {
    left: false,
    right: false,
    up: false,
    down: false
};

function startGame() {

    document.getElementById("menu").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");
    document.getElementById("gameOver").classList.add("hidden");

    player = document.getElementById("player");

    enemies = [
        document.querySelector(".enemy1"),
        document.querySelector(".enemy2"),
        document.querySelector(".enemy3")
    ];

    score = 0;
    speed = 5;
    playerX = 205;

    document.getElementById("score").textContent = score;

    gameRunning = true;

    enemies.forEach((enemy, index) => {

        enemy.style.top = (-200 - index * 300) + "px";

    });

    gameLoop();
}


/* CONTROLES */

document.addEventListener("keydown", function(event) {

    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keys.left = true;
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keys.right = true;
    }

    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        keys.up = true;
    }

    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        keys.down = true;
    }

});


document.addEventListener("keyup", function(event) {

    if (event.key === "ArrowLeft" || event.key.toLowerCase() === "a") {
        keys.left = false;
    }

    if (event.key === "ArrowRight" || event.key.toLowerCase() === "d") {
        keys.right = false;
    }

    if (event.key === "ArrowUp" || event.key.toLowerCase() === "w") {
        keys.up = false;
    }

    if (event.key === "ArrowDown" || event.key.toLowerCase() === "s") {
        keys.down = false;
    }

});


/* BUCLE PRINCIPAL */

function gameLoop() {

    if (!gameRunning) return;

    movePlayer();
    moveEnemies();
    checkCollision();

    requestAnimationFrame(gameLoop);
}


/* MOVIMIENTO DEL JUGADOR */

function movePlayer() {

    if (keys.left) {
        playerX -= 6;
    }

    if (keys.right) {
        playerX += 6;
    }

    if (keys.up) {
        speed += 0.05;
    }

    if (keys.down) {
        speed -= 0.08;
    }

    if (!keys.up && speed > 5) {
        speed -= 0.02;
    }

    speed = Math.max(3, Math.min(speed, 15));

    /* Limitar el auto dentro de la carretera */

    playerX = Math.max(15, Math.min(playerX, 415));

    player.style.left = playerX + "px";

    document.getElementById("speed").textContent =
        Math.round(speed * 15);
}


/* MOVIMIENTO DE LOS ENEMIGOS */

function moveEnemies() {

    enemies.forEach((enemy) => {

        let top = parseFloat(
            window.getComputedStyle(enemy).top
        );

        top += speed;

        if (top > window.innerHeight + 100) {

            top = -150 - Math.random() * 400;

            let positions = [30, 200, 350];

            enemy.style.left =
                positions[Math.floor(Math.random() * positions.length)]
                + "px";

            score += 10;

            document.getElementById("score").textContent = score;
        }

        enemy.style.top = top + "px";

    });

}


/* COLISIÓN */

function checkCollision() {

    let playerRect = player.getBoundingClientRect();

    enemies.forEach(enemy => {

        let enemyRect = enemy.getBoundingClientRect();

        if (
            playerRect.left < enemyRect.right &&
            playerRect.right > enemyRect.left &&
            playerRect.top < enemyRect.bottom &&
            playerRect.bottom > enemyRect.top
        ) {

            endGame();

        }

    });

}


/* FIN DEL JUEGO */

function endGame() {

    gameRunning = false;

    document.getElementById("finalScore").textContent = score;

    document.getElementById("game").classList.add("hidden");
    document.getElementById("gameOver").classList.remove("hidden");

}


/* REINICIAR */

function restartGame() {

    startGame();

}


/* VOLVER AL MENÚ */

function backToMenu() {

    gameRunning = false;

    document.getElementById("game").classList.add("hidden");
    document.getElementById("menu").classList.remove("hidden");

}
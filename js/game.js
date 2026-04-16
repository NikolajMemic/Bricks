let running = false;
let score = 0;
let time = 0;
let level = 1;
let timer;
let animationId;

function startGame() {
    cancelAnimationFrame(animationId);
    clearInterval(timer);

    score = 0;
    time = 0;
    level = 1;

    paddle.x = (canvas.width / 2) - (paddle.w / 2);
    resetBall();
    initBricks();

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    if (document.getElementById("level")) document.getElementById("level").innerText = level;

    running = true;
    startTimer();
    draw();
}

function startTimer() {
    timer = setInterval(() => {
        time++;
        document.getElementById("time").innerText = time;
    }, 1000);
}

function pauseGame() {
    if (!running) {
        running = true;
        startTimer();
        draw();
    } else {
        running = false;
        clearInterval(timer);
        cancelAnimationFrame(animationId);
    }
}

function gameOver() {
    running = false;
    cancelAnimationFrame(animationId);
    clearInterval(timer);
    saveHigh(score);
    alert("Game Over! Rezultat: " + score);
}

function gameWin() {
    level++;
    if (level > 3) {
        running = false;
        clearInterval(timer);
        alert("ZMAGA! Končali ste vse nivoje!");
        saveHigh(score);
    } else {
        cancelAnimationFrame(animationId);
        clearInterval(timer);
        alert("Nivo opravljen! Gremo na nivo " + level);
        
        paddle.x = (canvas.width / 2) - (paddle.w / 2);
        resetBall();
        initBricks();
        if (document.getElementById("level")) document.getElementById("level").innerText = level;
        
        running = true;
        startTimer();
        draw();
    }
}

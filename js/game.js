let running = false;
let score = 0;
let time = 0;
let level = 1;
let lives = 3;
let timeScale = 1.0;
let timer;
let animationId;

function startGame() {
    level = 1;
    score = 0;
    time = 0;
    lives = 3;
    startGameFromLevel(level);
}

function startGameFromLevel(selectedLevel) {
    cancelAnimationFrame(animationId);
    clearInterval(timer);
    
    level = selectedLevel;
    timeScale = 1.0;
    
    // Prilagoditev življenj glede na nivo ob začetku
    if (level === 1) lives = 3;
    else if (level === 2) lives = 2;
    else if (level === 3) lives = 1;

    paddle.x = (canvas.width / 2) - (paddle.w / 2);
    resetBall();
    initBricks();

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    document.getElementById("level").innerText = level;
    document.getElementById("lives").innerText = lives;

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
    running = !running;
    if (running) { startTimer(); draw(); }
    else { clearInterval(timer); cancelAnimationFrame(animationId); }
}

function loseLife() {
    lives--;
    document.getElementById("lives").innerText = lives;

    if (lives <= 0) {
        gameOver();
    } else {
        running = false;
        cancelAnimationFrame(animationId);
        
        Swal.fire({
            title: 'Izgubljeno življenje!',
            text: `Ostalo ti je še ${lives} življenj.`,
            icon: 'warning',
            confirmButtonText: 'Nadaljuj',
            background: '#1a1a1c',
            color: '#00d4ff'
        }).then(() => {
            resetBall();
            paddle.x = (canvas.width / 2) - (paddle.w / 2);
            running = true;
            draw();
        });
    }
}

function gameOver() {
    running = false;
    cancelAnimationFrame(animationId);
    clearInterval(timer);
    saveHigh(score);
    
    Swal.fire({
        title: 'GAME OVER!',
        text: `Tvoj rezultat: ${score}`,
        icon: 'error',
        confirmButtonText: 'Poskusi znova',
        background: '#1a1a1c',
        color: '#ff4136'
    }).then(() => {
        startGame();
    });
}

function checkWin() {
    if (bricks.every(b => b.status === 0)) {
        gameWin();
    }
}

function gameWin() {
    running = false;
    cancelAnimationFrame(animationId);
    clearInterval(timer);
    
    unlockNextLevel(level);

    Swal.fire({
        title: 'LEVEL KONČAN!',
        text: `Nivo ${level} opravljen!`,
        icon: 'success',
        confirmButtonText: level < 3 ? 'Naslednji nivo' : 'Konec igre',
        background: '#1a1a1c',
        color: '#00d4ff'
    }).then((result) => {
        if (result.isConfirmed && level < 3) {
            level++;
            startGameFromLevel(level);
        }
    });
}

function toggleLevelMenu() {
    const menu = document.getElementById("level-menu");
    const container = document.getElementById("levels-container");
    
    if (menu.style.display === "none") {
        container.innerHTML = "";
        for (let i = 1; i <= 3; i++) {
            const btn = document.createElement("button");
            btn.innerText = `Nivo ${i}`;
            if (i <= unlockedLevel) {
                btn.onclick = () => {
                    menu.style.display = "none";
                    startGameFromLevel(i);
                };
            } else {
                btn.classList.add("locked");
                btn.disabled = true;
                btn.innerText += " 🔒";
            }
            container.appendChild(btn);
        }
        menu.style.display = "block";
        if (running) pauseGame();
    } else {
        menu.style.display = "none";
        if (!running) pauseGame();
    }
}

function toggleHelpMenu() {
    const menu = document.getElementById("help-menu");
    if (menu.style.display === "none") {
        menu.style.display = "block";
        if (running) pauseGame();
    } else {
        menu.style.display = "none";
        if (!running) pauseGame();
    }
}

function toggleAuthorMenu() {
    const menu = document.getElementById("author-menu");
    if (menu.style.display === "none") {
        menu.style.display = "block";
        if (running) pauseGame();
    } else {
        menu.style.display = "none";
        if (!running) pauseGame();
    }
}

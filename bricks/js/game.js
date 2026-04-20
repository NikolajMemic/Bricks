let running = false;
let score = 0;
let time = 0;
let level = 1;
let timeScale = 1.0;
let timer;
let animationId;

function startGame() {
    level = 1;
    score = 0;
    time = 0;
    startGameFromLevel(level);
}

function startGameFromLevel(selectedLevel) {
    cancelAnimationFrame(animationId);
    clearInterval(timer);
    
    level = selectedLevel;
    timeScale = 1.0;
    
    paddle.x = (canvas.width / 2) - (paddle.w / 2);
    resetBall();
    initBricks();

    document.getElementById("score").innerText = score;
    document.getElementById("time").innerText = time;
    document.getElementById("level").innerText = level;

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

function gameOver() {
    running = false;
    cancelAnimationFrame(animationId);
    clearInterval(timer);
    saveHigh(score);
    Swal.fire({ title: 'Game Over', text: 'Žogica je padla!', icon: 'error', confirmButtonText: 'Poskusi znova' });
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
            btn.innerText = i <= unlockedLevel ? `Nivo ${i}` : `🔒`;
            if (i <= unlockedLevel) btn.onclick = () => { menu.style.display = "none"; startGameFromLevel(i); };
            container.appendChild(btn);
        }
        menu.style.display = "block";
        running = false;
        clearInterval(timer);
    } else { menu.style.display = "none"; }
}

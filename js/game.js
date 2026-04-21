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
        // ODPIRANJE MENIJA
        container.innerHTML = ""; // Počistimo gumbe pred ponovnim izrisom
        
        for (let i = 1; i <= 3; i++) {
            const btn = document.createElement("button");
            btn.innerText = `Nivo ${i}`;
            
            // Preverimo, če je nivo odklenjen (iz storage.js)
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
        if (running) {
            pauseGame(); // Pavziramo igro, ko igralec izbira nivo
        }
    } else {
        // ZAPIRANJE MENIJA
        menu.style.display = "none";
        
        // Če igra stoji (ni running), jo ob zaprtju menija spet zaženemo
        if (!running) {
            pauseGame();
        }
    }
}

function toggleAuthorMenu() {
    const menu = document.getElementById("author-menu");
    
    if (menu.style.display === "none") {
        // ODPIRANJE VIZITKE
        menu.style.display = "block";
        if (running) {
            pauseGame(); // To bo ustavilo timer in animacijo
        }
    } else {
        // ZAPIRANJE VIZITKE
        menu.style.display = "none";
        
        // Če je igra bila v teku (ali pa želimo, da se ob zaprtju takoj nadaljuje)
        // Pokličemo pauseGame(), ki bo zaradi logike (running = !running) igro spet zagnala
        if (!running) {
            pauseGame(); 
        }
    }
}

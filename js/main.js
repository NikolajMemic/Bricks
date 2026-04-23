let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
document.getElementById("lives").innerText = 3;

// Inicializacija kontrol (A / D)
initControls(canvas);

/**
 * Funkcija za izris retro Synthwave mreže v ozadju.
 * Ustvari vizualno mrežo s prosojnimi neonskimi črtami.
 */
function drawBackgroundGrid() {
    ctx.save();
    // Povečal sem vidljivost na 0.3, da boš zagotovo videl razliko
    ctx.strokeStyle = "rgba(255, 0, 255, 0.3)"; 
    ctx.lineWidth = 1;

    const spacing = 40;

    for (let x = 0; x <= canvas.width; x += spacing) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
    }

    for (let y = 0; y <= canvas.height; y += spacing) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
    }
    ctx.restore();
}
/**
 * Glavna zanka igre
 */
function draw() {
    if (!running) return; // Če igra ne teče, se zanka prekine

    // 1. Čiščenje platna
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // 2. Izris ozadja (mora biti pod vsemi ostalimi elementi)
    drawBackgroundGrid();

    // 3. Posodabljanje in izris ploščadi
    updatePaddle(canvas);
    drawPaddle(ctx, canvas);

    // 4. Izris opek in žogice
    drawBricks(ctx);
    drawBall(ctx);

    // 5. Logika za trke
    collision();
    wallCollision(canvas);
    paddleCollision(canvas);

    // 6. Premikanje žogice
    moveBall();

    // 7. Naslednji okvir animacije
    animationId = requestAnimationFrame(draw);
}

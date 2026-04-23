let ball;

function resetBall() {
    let baseSpeed = 3 + level; 
    ball = { 
        x: canvas.width / 2, 
        y: canvas.height - 50, // Začne nižje pri paddle-u
        dx: 2,                 // Začne pod kotom
        dy: -baseSpeed, 
        r: 8 
    };
}

function drawBall(ctx) {
    ctx.save(); // Shranimo stanje
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    
    // Dodajanje sija
    ctx.shadowBlur = 15;
    ctx.shadowColor = "#00d4ff";
    
    ctx.fillStyle = "#00d4ff"; // Svetlo modra barva
    ctx.fill();
    ctx.closePath();
    ctx.restore(); // Povrnemo stanje, da sij ne vpliva na vse ostalo
}

function moveBall() {
    // timeScale pripravljen za prihodnje ability-je
    ball.x += ball.dx * (typeof timeScale !== 'undefined' ? timeScale : 1);
    ball.y += ball.dy * (typeof timeScale !== 'undefined' ? timeScale : 1);
}

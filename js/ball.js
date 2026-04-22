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
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700";
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    // timeScale pripravljen za prihodnje ability-je
    ball.x += ball.dx * (typeof timeScale !== 'undefined' ? timeScale : 1);
    ball.y += ball.dy * (typeof timeScale !== 'undefined' ? timeScale : 1);
}

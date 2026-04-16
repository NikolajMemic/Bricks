let ball;

function resetBall() {
    // Hitrost se povečuje z nivojem (level je definiran v game.js)
    let baseSpeed = 3 + level; 
    
    ball = { 
        x: canvas.width / 2, 
        y: 200, 
        dx: 0,           // Začne naravnost navzgor
        dy: -baseSpeed, 
        r: 8 
    };
}

function drawBall(ctx) {
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    ctx.fillStyle = "#FFD700"; // Zlata žogica
    ctx.fill();
    ctx.closePath();
}

function moveBall() {
    ball.x += ball.dx;
    ball.y += ball.dy;
}

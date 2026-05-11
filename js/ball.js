let ball;
let isBombActive = false;

function resetBall() {
    let baseSpeed = 3 + level; 
    ball = { 
        x: canvas.width / 2, 
        y: canvas.height - 50, 
        dx: 2,                
        dy: -baseSpeed, 
        r: 8 
    };
    isBombActive = false; // Ob resetu žogica ni bomba
}

function drawBall(ctx) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.r, 0, Math.PI * 2);
    
    if (isBombActive) {
        // Bomba efekt: žareča oranžna žogica
        ctx.shadowBlur = 25;
        ctx.shadowColor = "#ff4136";
        ctx.fillStyle = "#ff851b";
    } else {
        ctx.shadowBlur = 15;
        ctx.shadowColor = "#00d4ff";
        ctx.fillStyle = "#00d4ff";
    }
    
    ctx.fill();
    ctx.closePath();
    ctx.restore(); 
}

function triggerBombEffect() {
    isBombActive = true;
    // Odstranili smo setTimeout, da ostane oranžna dokler ne udari
}

function moveBall() {
    ball.x += ball.dx * (typeof timeScale !== 'undefined' ? timeScale : 1);
    ball.y += ball.dy * (typeof timeScale !== 'undefined' ? timeScale : 1);
}

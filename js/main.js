let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
document.getElementById("lives").innerText = 3;

initControls(canvas);

function drawBackgroundGrid() {
    ctx.save();
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

function draw() {
    if (!running) return; 
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    drawBackgroundGrid();

    updatePaddle(canvas);
    drawPaddle(ctx, canvas);

    drawBricks(ctx);
    drawBall(ctx);

    collision();
    wallCollision(canvas);
    paddleCollision(canvas);

    moveBall();

    animationId = requestAnimationFrame(draw);
}

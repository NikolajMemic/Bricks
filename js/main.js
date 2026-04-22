let canvas = document.getElementById("game");
let ctx = canvas.getContext("2d");
document.getElementById("lives").innerText = 3;

// inicializacija kontrol (A / D)
initControls(canvas);

function draw(){
    if(!running) return; // Če igra ne teče, se ne izriše nič in zanka se prekine

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    updatePaddle(canvas);
    drawBall(ctx);
    drawPaddle(ctx, canvas);
    drawBricks(ctx);

    collision();
    wallCollision(canvas);
    paddleCollision(canvas);

    moveBall();

    animationId = requestAnimationFrame(draw);
}

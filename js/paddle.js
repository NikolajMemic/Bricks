let paddle = {
    w: 75,
    h: 10,
    x: 202.5 
};

let keys = {};

function initControls(canvas) {
    document.addEventListener("keydown", e => {
        keys[e.key.toLowerCase()] = true;
    });

    document.addEventListener("keyup", e => {
        keys[e.key.toLowerCase()] = false;
    });
}

function updatePaddle(canvas) {
    let speed = 7;
    if (keys["a"]) paddle.x -= speed;
    if (keys["d"]) paddle.x += speed;

    if (paddle.x < 0) paddle.x = 0;
    if (paddle.x + paddle.w > canvas.width) {
        paddle.x = canvas.width - paddle.w;
    }
}

function drawPaddle(ctx, canvas) {
    ctx.save();
    ctx.fillStyle = "white";
    ctx.shadowBlur = 20;
    ctx.shadowColor = "#00d4ff";
    ctx.fillRect(
        paddle.x,
        canvas.height - 20,
        paddle.w,
        paddle.h
    );
    ctx.restore();
}

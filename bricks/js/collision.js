function collision() {
    for (let i = 0; i < bricks.length; i++) {
        let b = bricks[i];
        if (b.status) {
            if (ball.x + ball.r > b.x && 
                ball.x - ball.r < b.x + 60 && 
                ball.y + ball.r > b.y && 
                ball.y - ball.r < b.y + 20) {

                ball.dy *= -1;
                b.status = 0;
                score++;
                document.getElementById("score").innerText = score;

                if (b.bonus) {
                    ball.dx *= 1.1;
                    ball.dy *= 1.1;
                }

                checkWin();
                break; // Ustavi, da ne uniči več opek hkrati
            }
        }
    }
}

function checkWin() {
    if (!bricks.some(b => b.status === 1)) {
        gameWin();
    }
}

function wallCollision(canvas) {
    if (ball.x - ball.r < 0) ball.dx = Math.abs(ball.dx);
    else if (ball.x + ball.r > canvas.width) ball.dx = -Math.abs(ball.dx);
    
    if (ball.y - ball.r < 0) ball.dy = Math.abs(ball.dy);
}

function paddleCollision(canvas) {
    if (ball.y + ball.r > canvas.height - 20) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
            let hitPoint = (ball.x - paddle.x) / paddle.w;
            ball.dx = (hitPoint - 0.5) * 8; 
            ball.dy = -Math.abs(ball.dy); 
            ball.y = canvas.height - 20 - ball.r; 
        } else if (ball.y > canvas.height) {
            gameOver();
        }
    }
}

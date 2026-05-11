const speedUp = 1.01;

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
                
                // Ko zadanemo katerokoli opeko, žogica preneha biti bomba
                // razen če je ta opeka spet bomba (kar se procesira spodaj)
                let wasBomb = isBombActive;
                isBombActive = false; 

                if (b.isBomb) {
                    explode(b.x, b.y);
                    if (typeof triggerBombEffect === "function") triggerBombEffect();
                } else if (b.bonus) {
                    score += 5; 
                    if (Math.random() < 0.20) {
                        lives++;
                        document.getElementById("lives").innerText = lives;
                    }
                    ball.dx *= 1.1; 
                    ball.dy *= 1.1;
                } else {
                    score++;
                }

                document.getElementById("score").innerText = score;
                checkWin();
                break;
            }
        }
    }
}

function explode(targetX, targetY) {
    const radiusX = 70; 
    const radiusY = 30; 

    bricks.forEach(brick => {
        if (brick.status) {
            if (Math.abs(brick.x - targetX) <= radiusX && 
                Math.abs(brick.y - targetY) <= radiusY) {
                brick.status = 0;
                score++;
            }
        }
    });
}

function wallCollision(canvas) {
    if (ball.x - ball.r < 0) {
        ball.dx = Math.abs(ball.dx) * speedUp;
    } else if (ball.x + ball.r > canvas.width) {
        ball.dx = -Math.abs(ball.dx) * speedUp;
    }
    if (ball.y - ball.r < 0) {
        ball.dy = Math.abs(ball.dy) * speedUp;
    }
}

function paddleCollision(canvas) {
    if (ball.y + ball.r > canvas.height - 20) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
            let hitPoint = (ball.x - paddle.x) / paddle.w;
            ball.dx = (hitPoint - 0.5) * 8; 
            ball.dy = -Math.abs(ball.dy) * speedUp;
            ball.y = canvas.height - 20 - ball.r; 
        } else if (ball.y > canvas.height) {
            loseLife(); 
        }
    }
}

// Faktor pospeška (1.01 pomeni +1% hitrosti ob vsakem odboju)
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
                
                // ⚡ Osnovni pospešek ob zadetku katerekoli opeke
                ball.dx *= speedUp;
                ball.dy *= speedUp;

                b.status = 0;
                
                // --- NADGRADNJA BONUS OPEKE ---
                if (b.bonus) {
                    score += 5; // Bonus opeka prinese 5 točk namesto 1
                    
                    // 20% možnosti za dodatno življenje
                    if (Math.random() < 0.20) {
                        lives++;
                        document.getElementById("lives").innerText = lives;
                    }
                    
                    // Dodaten sunek hitrosti (že obstoječe)
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
function wallCollision(canvas) {
    if (ball.x - ball.r < 0) {
        ball.dx = Math.abs(ball.dx) * speedUp; // ⚡ Pospešek ob steni
    } else if (ball.x + ball.r > canvas.width) {
        ball.dx = -Math.abs(ball.dx) * speedUp; // ⚡ Pospešek ob steni
    }

    if (ball.y - ball.r < 0) {
        ball.dy = Math.abs(ball.dy) * speedUp; // ⚡ Pospešek ob stropu
    }
}

function paddleCollision(canvas) {
    if (ball.y + ball.r > canvas.height - 20) {
        if (ball.x > paddle.x && ball.x < paddle.x + paddle.w) {
            let hitPoint = (ball.x - paddle.x) / paddle.w;
            ball.dx = (hitPoint - 0.5) * 8; 
            
            ball.dy = -Math.abs(ball.dy) * speedUp; 
            ball.dx *= speedUp;
            
            ball.y = canvas.height - 20 - ball.r; 
        } else if (ball.y > canvas.height) {
            // SPREMEMBA: Namesto gameOver() pokličemo loseLife()
            loseLife(); 
        }
    }
}

function checkWin() {
    if (!bricks.some(b => b.status === 1)) {
        gameWin();
    }
}

function collision() {
    for (let i = 0; i < bricks.length; i++) {
        let b = bricks[i];
        if (b.status) {
            if (ball.x + ball.r > b.x && 
                ball.x - ball.r < b.x + 60 && 
                ball.y + ball.r > b.y && 
                ball.y - ball.r < b.y + 20) {

                ball.dy *= -1; // Takojšen odboj
                b.status = 0;
                score++;
                document.getElementById("score").innerText = score;

                if (b.bonus) {
                    ball.dx *= 1.1;
                    ball.dy *= 1.1;
                }

                checkWin();
                break; // 💡 KLJUČNO: Ustavi zanko, da ne uničiš več opek hkrati!
            }
        }
    }
}

function checkWin() {
    // some() vrne true, če najde vsaj eno opeko, ki ima status 1
    const remains = bricks.some(b => b.status === 1);
    
    if (!remains) {
        gameWin();
    }
}

function wallCollision(canvas){
    if(ball.x - ball.r < 0 || ball.x + ball.r > canvas.width){
        ball.dx *= -1;
    }
    if(ball.y - ball.r < 0){
        ball.dy *= -1;
    }
}

function paddleCollision(canvas){
    // 1. Preverimo, če je žogica v območju ploščadi (vertikalno)
    if(ball.y + ball.r > canvas.height - 20){
        
        // 2. Preverimo, če je zadela ploščad (horizontalno)
        if(ball.x > paddle.x && ball.x < paddle.x + paddle.w){
            // Izračun odbojnega kota glede na točko dotika
            let hitPoint = (ball.x - paddle.x) / paddle.w;
            ball.dx = (hitPoint - 0.5) * 8; 
            ball.dy = -Math.abs(ball.dy); 
            
            // Popravek, da žogica ne "potone" v ploščad
            ball.y = canvas.height - 20 - ball.r; 
        } 
        // 3. Če je žogica padla pod ploščad, se igra konča
        else if (ball.y - ball.r > canvas.height) {
            gameOver();
        }
    }
}

let bricks = [];

function initBricks() {
    bricks = [];
    let rows, cols;

    if (level === 1) { rows = 3; cols = 6; } 
    else if (level === 2) { rows = 4; cols = 7; } 
    else { rows = 5; cols = 8; }

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            let offset = (canvas.width - (cols * 65)) / 2;
            
            // Povečana verjetnost na 10% * level za več akcije
            let isBonus = Math.random() < (0.10 * level); 

            bricks.push({
                x: c * 65 + offset,
                y: r * 25 + 40,
                status: 1,
                bonus: isBonus
            });
        }
    }
}

function drawBricks(ctx) {
    bricks.forEach(b => {
        if (b.status) {
            if (b.bonus) {
                ctx.fillStyle = "#FF4136"; // Živo rdeča za bonus
                ctx.strokeStyle = "#FFFFFF"; // Bela obroba za poudarek
                ctx.lineWidth = 2;
                ctx.strokeRect(b.x, b.y, 60, 20);
            } else {
                ctx.fillStyle = "#0074D9"; // Modra za navadne
            }
            ctx.fillRect(b.x, b.y, 60, 20);
        }
    });
}

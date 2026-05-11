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
            bricks.push({
                x: c * 65 + offset,
                y: r * 25 + 40,
                status: 1,
                bonus: Math.random() < (0.10 * level),
                isBomb: Math.random() < 0.10 
            });
        }
    }
}

function drawBricks(ctx) {
    bricks.forEach(b => {
        if (b.status) {
            ctx.save();
            if (b.isBomb) {
                ctx.fillStyle = "#000000";
                ctx.shadowBlur = 12;
                ctx.shadowColor = "#ff4136";
                ctx.strokeStyle = "#ff4136";
                ctx.lineWidth = 2;
                ctx.fillRect(b.x, b.y, 60, 20);
                ctx.strokeRect(b.x, b.y, 60, 20);
            } else if (b.bonus) {
                ctx.fillStyle = "#ff00ff";
                ctx.shadowBlur = 10;
                ctx.shadowColor = "#ff00ff";
                ctx.strokeStyle = "#ffffff";
                ctx.lineWidth = 2;
                ctx.fillRect(b.x, b.y, 60, 20);
                ctx.strokeRect(b.x, b.y, 60, 20);
            } else {
                ctx.fillStyle = "#0074D9";
                ctx.shadowBlur = 5;
                ctx.shadowColor = "#00d4ff";
                ctx.fillRect(b.x, b.y, 60, 20);
            }
            ctx.restore();
        }
    });
}

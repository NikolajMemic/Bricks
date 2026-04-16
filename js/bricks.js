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
                y: r * 25 + 40, // 💡 Premaknjeno malo višje (prej 50)
                status: 1,
                bonus: Math.random() < (0.05 * level)
            });
        }
    }
}
function drawBricks(ctx) {
    bricks.forEach(b => {
        if (b.status) {
            ctx.fillStyle = b.bonus ? "#FF4136" : "#0074D9";
            ctx.fillRect(b.x, b.y, 60, 20);
        }
    });
}

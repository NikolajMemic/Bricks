let high = localStorage.getItem("high") || 0;
let unlockedLevel = parseInt(localStorage.getItem("unlockedLevel")) || 1;

document.getElementById("high").innerText = high;

function saveHigh(score) {
    if (score > high) {
        localStorage.setItem("high", score);
        high = score;
        document.getElementById("high").innerText = high;
    }
}

function unlockNextLevel(currentLevel) {
    if (currentLevel >= unlockedLevel && unlockedLevel < 3) {
        unlockedLevel = currentLevel + 1;
        localStorage.setItem("unlockedLevel", unlockedLevel);
    }
}

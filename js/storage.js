let high = localStorage.getItem("high") || 0;
document.getElementById("high").innerText = high;

function saveHigh(score){
    if(score > high){
        localStorage.setItem("high", score);
        alert("NEW HIGH SCORE!");
    }
}

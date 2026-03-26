const brickContainer = document.getElementById("bricks");

const rows = 5;
const cols = 10;

for(let i = 0; i < rows; i++){
	for(let j = 0; j < cols; j++){
		
		const brick = document.createElement("div");
		brick.classList.add("bricks");
		
		brick.style.top = (i * 20) + "%";
		brick.style.left = (j * 10) + "%";
		
		brick.style.backgroundColor = nakljucnaBarva();
		
		brickContainer.appendChild(brick);
		
	}
}

function nakljucnaBarva(){
	const barve = ["Red", "Green", "Blue", "Orange", "Purple"];
	return barve[Math.floor(Math.random() * barve.length)];
}

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
const box = 25;
const canvasSize = 23;
let soundtrack1 = document.getElementById('soundtrack1');
let soundtrack2 = document.getElementById('soundtrack2');;
let score = 0;
let worm = [];

worm[0] = {
	x: Math.floor((canvasSize/2)) * box,
	y: Math.floor((canvasSize/2)) * box
};

let dir;
document.addEventListener('keydown', direction);

function direction(event){
	if(event.keyCode == 37 && dir != 'RIGHT'){
		dir = "LEFT";
	}
	else if(event.keyCode == 38 && dir != 'DOWN'){
		dir = "UP";
	}
	else if(event.keyCode == 39 && dir != 'LEFT'){
		dir = "RIGHT";
	}
	else if(event.keyCode == 40 && dir != 'UP'){
		dir = "DOWN";
	}
}

let food = {
	x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
	y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box 
}

function draw(){
	ctx.fillStyle = '#ffffff';
	ctx.fillRect(box, box, canvasSize*box - box, canvasSize*box-box);
	for(let i = 0; i < worm.length; i++){
		ctx.fillStyle = '#ff9b94';
		ctx.fillRect(worm[i].x, worm[i].y, box, box);
		if(worm[i].x == food.x && worm[i].y == food.y){
		food = {
				x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
				y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box
			}
		}
	}

	let wormX = worm[0].x;
	let wormY = worm[0].y;

	if(dir == "LEFT"){
        wormX -= box;
    }
	if(dir == "RIGHT"){
        wormX += box;
    }
	if(dir == "UP"){
        wormY -= box;
    }
	if(dir == "DOWN"){
        wormY += box;
    }
     
     
	if(wormX == food.x && wormY == food.y){
		score+=1;
		food = {
			x: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box,
			y: Math.floor(1 + (Math.random() * (canvasSize - 1))) * box 
		}
	}
	else{
		worm.pop();
	}

	let newHead = {
		x: wormX,
		y: wormY
    };
    
	function collision(head, array){
		for(let i = 0; i < array.length; i++){
			if(head.x == array[i].x && head.y == array[i].y){
				return true;
			}
		}
		return false;
    }
    
	if(wormX < box || wormY < box || 
		wormX > ((canvasSize - 1) * box)|| wormY > ((canvasSize - 1) * box) || collision(newHead,worm)){
		clearInterval(game);
		soundtrack1.pause();
		soundtrack2.play();
	}
    worm.unshift(newHead);
    
	ctx.fillStyle = '#ff1100';
	ctx.fillRect(food.x, food.y, box, box);

	ctx.fillStyle = '#ffffff';
	ctx.font = '24px Arial';
	ctx.clearRect(0, 0, 50, 25);
	ctx.fillText(score, box, 0.8 * box);
}

soundtrack1.play();
let game = setInterval(draw, 90);
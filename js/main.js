const screen = document.getElementById('screen');
const screen_ctx = screen.getContext('2d');
let worm = [{x: 200, y: 200},
            {x: 190, y: 200},
            {x: 180, y: 200},
            {x: 170, y: 200},
            {x: 160, y: 200},];
let dx = 10;
let dy = 0;

main();
document.addEventListener("keydown", direction);

function drawWormPart(wormPart){
    screen_ctx.fillStyle = '#ffabfc';
    screen_ctx.strokestyle = '#000000';
    screen_ctx.fillRect(wormPart.x, wormPart.y, 10, 10);
    screen_ctx.strokeRect(wormPart.x, wormPart.y, 10, 10);
}

function drawWorm(){
    worm.forEach(drawWormPart);
}

function clearCanvas(){
    screen_ctx.fillStyle = '#ffffff';
    screen_ctx.strokestyle = '#000000'; 
    screen_ctx.fillRect(0, 0, screen.width, screen.height);
    screen_ctx.strokeRect(0, 0, screen.width, screen.height);
}

function moveWorm(){
    const head = {x: worm[0].x + dx, y: worm[0].y};
    worm.unshift(head);
    worm.pop();
}

function direction(event){
    const LEFT_KEY = 37;
    const RIGHT_KEY = 39;
    const UP_KEY = 38;
    const DOWN_KEY = 40;

    const keyPressed = event.keyCode;
    const goingUp = dy === -10;
    const goingDown = dy === 10;
    const goingRight = dx === 10;
    const goingLeft = dx === -10;

    if (keyPressed === LEFT_KEY && !goingRight){    
        dx = -10;
        dy = 0;  
    }
 
     if (keyPressed === UP_KEY && !goingDown){    
        dx = 0;
        dy = -10;
    }
 
     if (keyPressed === RIGHT_KEY && !goingLeft){    
        dx = 10;
        dy = 0;
    }
 
     if (keyPressed === DOWN_KEY && !goingUp){    
        dx = 0;
        dy = 10;
    }
}

function gameEnd(){
    for(let i = 4;i<worm.length;i++){
        const collision = worm[i].x === worm[0].x && worm[i].y === worm[0].y
        if (collision){
            return true;
        } 
    }
    const leftWall = worm[0].x < 0;
    const rightWall = worm[0].x > screen.width - 10;
    const topWall = worm[0].y < 0;
    const bottomWall = worm[0].y > screen.height - 10;

    return leftWall || rightWall || topWall || bottomWall;
}

function main(){
    if(gameEnd()) return;
    direction = true;
    setTimeout(function onTick() {
        clearCanvas();
        moveWorm();
        drawWorm();
        main();  
    }, 100)
}

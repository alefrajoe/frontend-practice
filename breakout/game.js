// Define a number of parameters of the breakout game
let numRows = 3;
let numColumns = 4;
let widthBlocks = 100;
let heightBlocks = 10;
let verticalMargin = 10;
let horizontalMargin = 40;

// Auxiliary function
const any = (arr, fn = Boolean) => arr.some(fn);

// Define the function to add a block
function addBlockToScreen(top, left, width, height){

    // Grab the screen
    let screen = document.querySelector('.screen');

    // Create a block
    let block = document.createElement('div');

    // Set the property
    block.classList.add('block');

    // Set the position of the block
    block.setAttribute('data-y', 300 - top - heightBlocks);
    block.setAttribute('data-x', left);


    // Set that the block is active
    block.setAttribute('data-active', true);

    // Set the style of the block
    block.style.left = left + 'px';
    block.style.top = top + 'px';
    block.style.width = width + 'px';
    block.style.height = height + 'px';

    // Append the block to the screen
    screen.appendChild(block);
}

function addPlayerToScreen(){

    // Grab the screen
    let screen = document.querySelector('.screen');

    // Create a block
    let block = document.createElement('div');

    // Set the property
    block.classList.add('player');

    // Add x position of the player
    block.setAttribute('data-x', (300 - widthBlocks / 2));
    block.setAttribute('data-dx', 2);

    // Set the style of the block
    block.style.left = block.dataset.x + 'px';
    block.style.bottom = 10 + 'px';
    block.style.width = widthBlocks + 'px';
    block.style.height = heightBlocks + 'px';

    // Append the block to the screen
    screen.appendChild(block);
}

function addBallToScreen(){

    // Grab the screen
    let screen = document.querySelector('.screen');

    // Create a block
    let block = document.createElement('div');

    // Set the property
    block.classList.add('ball');

    // Add ball velocities
    block.setAttribute('data-x', 293);
    block.setAttribute('data-y', (12 + heightBlocks));
    block.setAttribute('data-dx', 0);
    block.setAttribute('data-dy', 0);

    // Set the style of the block
    block.style.left = 293 + 'px';
    block.style.bottom = (12 + heightBlocks) + 'px';

    // Append the block to the screen
    screen.appendChild(block);
}

function moveBall(){

    // Change the position of the ball according to the velocities
    let ball = document.querySelector('.ball');

    // Change the x position
    ball.dataset.x = (Number(ball.dataset.x) + Number(ball.dataset.dx));

    // Change the y position
    ball.dataset.y = (Number(ball.dataset.y) + Number(ball.dataset.dy));

    // Show changes in x with the stilying
    ball.style.left = ball.dataset.x + 'px';

    // Show changes in y with the stilying
    ball.style.bottom = ball.dataset.y + 'px';

    // Check collision with the wall
    checkCollisionWithWall();

    // Check collision with the lpayer
    checkCollisionWithPlayer();

    // Check collision with the blocks
    checkCollisionWithBlocks();

    // Check for the win
    checkWin();
}

function startGame(){

    // Take the ball
    let ball = document.querySelector('.ball');

    // Kick-off the game
    ball.dataset.dx = 2;
    ball.dataset.dy = 2;
}

// Append all the blocks to screen
for(let i=0; i<numRows; i++){
    for (let j=0; j<numColumns; j++){

        // Append the block
        addBlockToScreen(verticalMargin * (1 + i) + heightBlocks * i , horizontalMargin * (1 + j) + widthBlocks * j, widthBlocks, heightBlocks);
    }
}

function checkCollisionWithWall(){

    // Grab the ball
    let ball = document.querySelector('.ball');

    // Check collision with the top wall
    if (Number(ball.dataset.y) + 14 >= 300){ball.dataset.dy = - Number(ball.dataset.dy);}

    // Check collision with the left wall
    if (Number(ball.dataset.x) <= 0 || Number(ball.dataset.x) >= 586){ball.dataset.dx = - Number(ball.dataset.dx);}

    // Check if the game is lost
    if (Number(ball.dataset.y) <= 0) {

        // Stop the ball 
        ball.dataset.dx = 0;
        ball.dataset.dy = 0;

        // Take the intro of the web page
        let intro = document.querySelector('.intro');

        // Print the result in the web page
        intro.innerHTML = "You lose!";
    }
}

function checkCollisionWithPlayer(){

    // Grab the ball
    let ball = document.querySelector('.ball');

    // Grab the player
    let player = document.querySelector('.player');

    // If the ordinate of the ball is not larger than the height of the player
    if (Number(ball.dataset.y) <= (10) + Number(heightBlocks)){

        // If the center of the ball is within the player minimum and maximum abscissa
        if (Number(ball.dataset.x) + 7 >= Number(player.dataset.x) && Number(ball.dataset.x) + 7 <= Number(player.dataset.x) + widthBlocks){

            // The ball bounces back to the ceiling
            ball.dataset.dy = - Number(ball.dataset.dy);
        }
    }
}

function checkCollisionWithBlocks(){

    // Grab the ball
    let ball = document.querySelector('.ball');

    // Grab all blocks
    let blocks = document.querySelectorAll('.block');

    // Take only the blocks that are active
    blocks = blocks.forEach((block) => {

        // If the block is active
        if (block.dataset.active == "true"){

            // If the ball is in contact with the block on the vertical and horizontal axis
            if(Number(ball.dataset.y) + 14 <= Number(block.dataset.y) && Number(ball.dataset.y) + 14 + Number(ball.dataset.dy) > Number(block.dataset.y) && Number(ball.dataset.x) + 7 >= Number(block.dataset.x) && Number(ball.dataset.x) + 7 <= Number(block.dataset.x) + widthBlocks){

                // Deactivate the block
                block.dataset.active = false;

                // Hide the block
                block.hidden = "hidden";

                // Let the ball bounce back
                ball.dataset.dy = - Number(ball.dataset.dy);
            }
        }
    });
}

function checkWin(){

    // Set an array
    let active = [];

    // Grab all blocks
    let blocks = document.querySelectorAll('.block');

    // If at least one block is active return false
    blocks.forEach((block) => {active.push(Boolean(block.dataset.active));})

    // If at least one element is true
    let result = !any(active);

    // If result is true stop the game and print to screen
    if (result){

        // Grab the intro
        let intro = document.querySelector('.intro');

        // Print to screen
        intro.innerHTML = "You win!";
    }
}

function movePlayer(event){

    // Grab the player block
    let player = document.querySelector('.player');

    // If the event is right or left arrow
    if (event.key === 'ArrowRight' && (Number(player.dataset.x) + Number(player.dataset.dx)) <= (600 - widthBlocks)){

        // Update the x position
        player.dataset.x = Number(player.dataset.x) + Number(player.dataset.dx);

        // Move the player
        player.style.left = player.dataset.x + 'px';
    }

    // If the event is right or left arrow
    if (event.key === 'ArrowLeft' && (Number(player.dataset.x) - Number(player.dataset.dx)) >= 0){

        // Update the x position
        player.dataset.x = Number(player.dataset.x) - Number(player.dataset.dx);

        // Move the player
        player.style.left = player.dataset.x + 'px';
    }
}

// Append the player to screen
addPlayerToScreen();

// Add ball to screen
addBallToScreen();

// Kick off the game
document.addEventListener('keydown', (event) => {if (event.key === 'Enter') startGame();})

// Move the player
document.addEventListener('keydown', (event) => {movePlayer(event);});

// Start moving the ball
setInterval(moveBall, 30);
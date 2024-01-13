// Grab the canvas and the context
let canvas = document.getElementById('canvas-balls');
let ctx = canvas.getContext('2d');

// Define the gravity
let gravity = 0.1;

// Define mouse object
mouse = {x : 0, y : 0};

// Get cursor position on the canvas
function getCursorPosition(canvas, event) {
    const rect = canvas.getBoundingClientRect();
    mouse.x = Math.floor( (event.clientX - rect.left) / rect.width * canvas.width );
    mouse.y = Math.floor( (event.clientY - rect.top) / rect.height * canvas.height );
}

// Add event listener to get position of the mouse on the canvas
canvas.addEventListener('mousemove', function(e) {
    getCursorPosition(canvas, e)
})

function backgroundCanvas(canvas, ctx, color){

    // Set the fillstyle of the canvas
    ctx.fillStyle = color;

    // Drow a rectangle as a new background
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function randomColor(){

    return "rgba("+Math.round(Math.random() * 255)+","+Math.round(Math.random() * 255)+","+Math.round(Math.random() * 255)+","+Math.random()+")";
}

function ball(canvas, ctx){

    let ball = {};

    // Create a new ball to the canvas
    ball.color = randomColor();
    ball.radius = 4 + Math.round(Math.random() * 14);
    ball.startradius = ball.radius;
    ball.x = Number(ball.radius) + Math.round(Math.random() * (canvas.width - 2 * Number(ball.radius)));
    ball.y = Number(ball.radius) + Math.round(Math.random() * (canvas.height - 2 * Number(ball.radius)));
    ball.vx = Math.round(Math.random() * 10) - 5.0;
    ball.vy = Math.round(Math.random() * 10) - 5.0;

    // Update the ball
    ball.update = function (){
        // Check if the ball bounce along the x
        if ((Number(this.x) + Number(this.vx) <= Number(this.radius)) || (Number(this.x) + Number(this.vx) >= Number(canvas.width) - Number(this.radius))){
            this.vx = - Number(this.vx);
        } else {
            this.x = this.x + this.vx;
        }

        // Check if the ball bounce along the y
        if ((Number(this.y) + Number(this.vy) <= Number(this.radius)) || (Number(this.y) + Number(this.vy) >= Number(canvas.height) - Number(this.radius))){
            this.vy = - Number(this.vy);
        } else {
            this.y = this.y + this.vy;
        }

        // Update the velocity due to gravity
        this.vy = Number(this.vy) + gravity;

        // Check if the mouse is on the ball
        if (
            (Number(mouse.x) > Number(this.x) - 10) && 
            (Number(mouse.x) < Number(this.x) + 10) &&
            (Number(mouse.y) > Number(this.y) - 10) &&
            (Number(mouse.y) < Number(this.y) + 10) &&
            (Number(this.radius) < 70)
        ) {
            this.radius = Number(this.radius) + 3;
        } else {
            if (Number(this.radius) >= Number(this.startradius) + 3){
                this.radius = this.radius - 3;
            }
        }
    }

    // Return the ball
    return ball
}

function drawBall(canvas, ctx, ball){

    // Draw the ball to the canvas
    ctx.beginPath();
    ctx.arc(ball.x, ball.y, ball.radius, 0, 2 * Math.PI);
    ctx.fillStyle = ball.color;
    ctx.fill();
}

function animate(canvas, ctx, balls){

    // Clear the canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw the backgrond
    backgroundCanvas(canvas, ctx, "lightblue");

    // Update all the balls
    balls.forEach((ball) => {ball.update();});

    // Draw the ball
    balls.forEach((ball) => {drawBall(canvas, ctx, ball);})
}

// Draw the background of the canvas
backgroundCanvas(canvas, ctx, "lightblue");

// Define the array containing the balls
let balls = [];

// Define a number of balls
for (let i=0; i<30; i++){
    balls.push(ball(canvas, ctx));   
}

// Draw the balls in the canvas
balls.forEach((elem) => {drawBall(canvas, ctx, elem)})

// Clear the screen
setInterval(function () {animate(canvas, ctx, balls);}, 50);
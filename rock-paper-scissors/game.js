// Define the buttons
moves = ["rock", "paper", "scissors"];

// Moves to integers
movesToInteger = {"rock" : 0,
                "paper" : 1,
                "scissors" : 2};

// loop over all the moves
for (move of moves){
    
    // create the button
    let button = document.createElement('button');

    // Add class to the button
    button.classList.add('btn');
    
    // Insert the move into the button
    button.innerHTML = move;
    
    // Append an event listener to the 
    button.addEventListener('click', function () {
        
        // Play a game
        let result = playGame(this);

        // Update the result
        updateResult(result);

        // Update the result of the game
        resultGame(result);
    });

    // Append the button to the body of the html file
    document.body.appendChild(button);
}

function playGame(elem){
    
    // Take player move
    let player = elem.innerHTML;

    // Take random computer move
    let computer = moves[Math.floor(Math.random() * 3.0)]

    // Return the results
    return {"player" : player,
            "computer" : computer};
}

function updateResult(game){

    // Update the result after a game
    document.querySelector('.player-move').innerHTML = game.player;
    document.querySelector('.computer-move').innerHTML = game.computer;
}

function resultGame(game){

    // Take the result node
    let result = document.querySelector('.result');

    // Map the game to integers
    let player = movesToInteger[game.player];
    let computer = movesToInteger[game.computer];

    // Show result
    if (player === computer) {result.innerHTML = "Tie game!";}
    else if ((player % 3) === ((computer + 1) % 3)) {result.innerHTML = "You won!";}
    else {result.innerHTML = "You Lose!";}
}
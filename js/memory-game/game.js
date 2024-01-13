// Create the 12 cards
cards = [{"name" : "charizard",
        "path" : "static/charizard.png"},
        {"name" : "blastoise",
        "path" : "static/blastoise.png"},
        {"name":"gengar",
        "path":"static/gengar.png"},
        {"name":"mew",
        "path":"static/mew.png"},
        {"name":"mewtwo",
        "path":"static/mewtwo.png"},
        {"name":"venusaur",
        "path":"static/venusaur.png"},
        {"name":"pikachu",
        "path":"static/pikachu.png"},
        {"name":"zapdos",
        "path":"static/zapdos.png"}];

// Create a deck of cards
let deck = [...cards];

// Shuffle the deck
deck = deck.sort( () => .5 - Math.random() );

// Define your stack
let stack = [];

// Define timeouts
let timeouts = [];

// Define your score and show to screen
let score = 0;
document.querySelector('.score').innerHTML = score

// Double the cards
for (elem of cards){

    // Pull an element into deck
    deck.push(elem);
}

// For all the images in deck
deck.forEach(function (image, i){

    // Grab the grid
    let gridElement = document.querySelector('.grid-container');
    
    // Create a card
    let cardInDocument = document.createElement('img');

    // Set the path of the image
    cardInDocument.setAttribute('src', 'static/back-of-card.png');

    // Set the card id
    cardInDocument.setAttribute('id', i);

    // Set the pokemon name associated with the card
    cardInDocument.setAttribute('data-name', image.name)
    cardInDocument.setAttribute('data-active', true);

    // Set the classese of the images
    cardInDocument.classList.add('grid-element');
    cardInDocument.classList.add('back');

    // Turn when clicked
    cardInDocument.addEventListener('click', turnCard);

    // Append the image to the document
    gridElement.appendChild(cardInDocument);
})

function turnCard(){

    // If the card is turned back
    if (this.classList.contains('back') && this.dataset.active){

        // Replace the class
        this.classList.replace('back', 'front');

        // Show the corresponding image
        this.setAttribute('src', deck[this.id].path)

        // After two seconds turn the card again
        timeouts.push(setTimeout(turnBack(this.id), 2000));

        // Chack the card to update the result
        if (stack.length === 1){

            // If the card is the same
            if (stack[0].name === this.dataset.name){
                
                // Update the score
                updateScore(true);

                // Grab the partner image
                let partnerImage = document.querySelectorAll('.grid-element')[stack[0].id];

                // Deactivate the current image and the partner
                this.dataset.active = false;
                partnerImage.dataset.active = false;

                // Break all timeouts
                timeouts.forEach((value) => {clearTimeout(value);})

                // Set to white
                this.setAttribute('src', 'static/white.jpg');
                partnerImage.setAttribute('src', 'static/white.jpg');

                // Reset the array
                stack = [];
            } else {
                
                // Update the score
                updateScore(false);

                // Reset the array
                stack = [];
            }
        } else {

            // Append the object associated with the card turned
            stack.push({"name":this.dataset.name, "id":this.id})
        }
    }
}

function turnBack(id){
    return function(){

        // Take all images
        let images = document.querySelectorAll('.grid-element');

        // If the image is active and shows the back flip it
        if (images[id].classList.contains('front') && images[id].dataset.active){

            // Set the images to back
            images[id].classList.replace('front', 'back');

            // Show the image
            images[id].setAttribute('src', 'static/back-of-card.png');
        }
    }
}

function updateScore(bool){

    // If true add one to the score
    if (bool){

        // Update the score
        score += 1;

        // Grab the score
        document.querySelector('.score').innerHTML = String(score);

        // Append the colored relative score
        document.querySelector('.score-positive').innerHTML = "+1!";

        // Set timeout for the relative score
        setTimeout(() => {document.querySelector('.score-positive').innerHTML = "";}, 800);

    } else {

        // Else remove 1 from the score
        score -= 1;

        // Grab the score
        document.querySelector('.score').innerHTML = String(score);

        // Append the colored relative score
        document.querySelector('.score-negative').innerHTML = "-1!";
    
        // Set timeout for the relative score
        setTimeout(() => {document.querySelector('.score-negative').innerHTML = "";}, 800);

    }
}
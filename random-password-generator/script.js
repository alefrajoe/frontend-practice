$(document).ready(
    () => {

        // Generate a password when button is clicked
        $('#button-generate').click(function() {
            
            // Create the password
            let password = createPassword();

            // Change the text
            $('input').val(password);
        })

        // Copy to clipboard when the icon is pressed
        $('i.fa-copy').click(function (){

            // Copy the content 
            let content = $('input').val();

            if (content.length > 0){

                // Put to navigator
                navigator.clipboard.writeText(content);

                // Activate the notification
                $('.notification').removeClass('deactivated');

                // Deactivate the notification after a few seconds
                setTimeout(() => {$('.notification').addClass('deactivated');}, 2500); 
            }           
        })
    }
)

function createPassword(){

    
    // Create the string
    let chars = "abcdefghilmnopqrstuvzABCDEFGHILMNOPQRSTUVZ0123456789+^?@$%&£!"

    // Initialize the string to be used
    let str = "";

    // Sample characters and append to string
    for (let i=0; i<10; i++){

        // Sample a random index
        let int = Math.floor(Math.random() * chars.length);
    
        // Append the character to the string
        str = str + chars[int];
    }

    // Shuffle the variable
    var shuffled = str.split('').sort(function(){return 0.5-Math.random()}).join('');
    
    // Return the shuffled characters
    return shuffled;
}
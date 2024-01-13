async function getDictionaryAPI(word){

    // Define the url to be used for the API call
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/"

    // Use fetch to get a response from the API
    const result = await fetch(url + word).then((res) => {return res.json()});

    // Print the phonetic
    $('#p-phonetic').html(`<strong>Phonetic:</strong> ${result[0].phonetic}`)
    
    // Print the first meaning
    $('#p-explanation').html(`<strong>Explanation:</strong> ${result[0].meanings[0].definitions[0].definition}`);

    // Save the new audio related to the word searched
    // IF the audio is available
    if (result[0].phonetics[0].audio){
        // Set the correct source file and show the audio file
        $('audio').attr("src", result[0].phonetics[0].audio).show();
    } else {
        // Set the source file (to 'undefined') and then hide the audio file
        $('audio').attr("src", result[0].phonetics[0].audio).hide();
    }
    
}

async function grabWordAndGetResults(){

    // Grab the word from the input box
    const word = $('input').val();

    // Clean the input
    $('input').val('');

    // Search the word in the box
    getDictionaryAPI(word);
}

$(document).ready(() => {

    // Hide the audio file by default
    $('audio').hide();
    
    // When there is a "Enter" event trigger the function
    $(document).on('keydown', (e) => {
        
        // If key is enter
        if (e.key === 'Enter'){

            // Grab the word and get the results
            grabWordAndGetResults();
        }
    })
})
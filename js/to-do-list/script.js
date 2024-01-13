$(document).ready(
    () => {

        // Define itemID
        var itemID = 0;

        // Define date object
        var time = new Date();

        function createItem(int){
            console.log(int)
            // Pick what is written in text-area
            let text = $('#text-area').val();

            // Get the time
            let day = time.getDay();
            let month = time.getMonth();
            let hours = time.getHours();
            let minutes = time.getMinutes();
            let seconds = time.getSeconds();

            // Clear the text box
            $('#text-area').val("");

            // If text is non trivial
            if(text.length > 0){
                // Create element to append
                $(`<div class="container" id='container-${int}'></div>`).appendTo('#list');
                $(`<div class='item' id='item-${int}'>${text}</div>`).click(() => {$(`#item-${int}`).toggleClass('press');}).appendTo(`#container-${itemID}`);
                // Create delete item
                $('<button class="delete">x</button>').click(() => {$(`#container-${int}`).remove();}).appendTo(`#container-${itemID}`)

            }
        }

        $(document).keydown((e) => {if (e.key == "Enter") {createItem(itemID); itemID++;}});
        $('button').click(() => {createItem(itemID); itemID++;});
    }
)
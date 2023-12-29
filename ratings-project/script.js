// Grab all stars
$(document).ready(
    () => {
        
        // Grab all stars
        $('.fa-star').click((event) => {

            // Get the index clicked
            const indexClicked = Number($(event.target)[0].dataset.index);

            // Define a list of colors
            const colors = ['red', 'orange', 'lightblue', 'lightgreen', 'green'];

            // Grab all stars
            $('.fa-star').each((index, value) => {
                
                // If the index is smaller or equal toggle class
                if (index <= indexClicked){

                    // Add the class to make the stars gold 
                    $(`[data-index=${index}]`).addClass('gold')
                } else {

                    // Else remove the class
                    $(`[data-index=${index}]`).removeClass('gold')
                }
                console.log()
            })

            // Change the color of the emoji face
            $('.face').css({color: colors[indexClicked]});

            // Change the face
            $('.face').css({top: `-${48 * indexClicked}px`});
        })
    }
)
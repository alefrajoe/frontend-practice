$(document).ready(
    () => {

        // Define the number of photos to be added
        const N = 8;

        // Loop to create the images
        for (let i=0; i<N; i++){

            // Create a span containing the image
            $(`<span style='--i: ${i}'><img src='https://picsum.photos/id/${Math.floor(Math.random() * 60)}/300/200' data-id=${i}></span>`).appendTo($('.image-container'));
        }

        // Rotate the images with next
        $('#button-right').click(() => {

            // Grab all images
            $('.image-container span').each(function(index) {
                
                // Get current i
                let tempI = $(this).css('--i');

                // Change the value of i
                $(this).css({'--i': (Number(tempI) + 1)});
            });
        })

            // Rotate the images with next
            $('#button-left').click(() => {

                // Grab all images
                $('.image-container span').each(function(index) {
                    
                    // Get current i
                    let tempI = $(this).css('--i');
    
                    // Change the value of i
                    $(this).css({'--i': (Number(tempI) - 1)});
                });
            })

    }
)
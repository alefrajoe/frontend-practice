// Define the number of steps to be appended to the progress bar
let N = 5;

// Define current position
let pos = 0;

$(document).ready(
    () => {

        // Append 5 steps to the progress bar
        for (let i=0; i<N; i++){

            // First step
            if (i === 0){
                $('<i class="fa-solid fa-check green-circle"></i>').appendTo($('#container-progress-bar'));

            } else {
                $('<i class="fa-solid fa-xmark gray-circle"></i>').appendTo($('#container-progress-bar'));
            }
        }

        // Set the left button
        $('button.left').click(() => {pos--; setPosition(pos);});

        // Set the right button
        $('button.right').click(() => {pos++; setPosition(pos);});
    }
)

function setPosition(int){

    // If int is too high return
    if (int >= N) return;

    // Set the width of the green horizontal line to the given position
    $('.progress-bar.green').attr('style', `--i:${int * 24.75}%`);

    // Set the corresponding circles to green
    $('.fa-solid').each(function (index, value) {
        
        // Set the color of the border and the content depending on the index
        if (index <= int){

            // Change the content
            $(value).removeClass('fa-xmark').addClass('fa-check');

            // Change the color of the border
            $(value).removeClass('gray-circle').addClass('green-circle');

            // If int is zero the left button is disabled
            if (int === 0) {

                // Set the left button to disabled
                $('button.left').attr('disabled', true);
            } else {
                // Set the left button to disabled
                $('button.left').attr('disabled', false);
            }

            // If int is the last set the right button to disabled
            if (int === (N-1)){
                $('button.right').attr('disabled', true);
            } else {
                $('button.right').attr('disabled', false);
            }

        } else {

            // Change the content inside the circle
            $(value).removeClass('fa-check').addClass('fa-xmark');

            // Change the color of the border
            $(value).removeClass('green-circle').addClass('gray-circle');
        }
    })
}
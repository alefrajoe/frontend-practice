$(document).ready(
    () => {

        // Create click event for selection
        $('#selected').click(() => {

            // Toggle all social
            $('#items').toggle();

            // Rotate the arrow
            $('.fa-caret-down').toggleClass('rotate');
        });

        // Create click event for li
        $('li').click(function () {
            
            // Put the new social as a selected item
            $('#selected').html($(this).html());

            // Toggle all socials
            $('#items').toggle();

            // Remove click event from selected
            $('#selected').off('click');
        });

    }
)
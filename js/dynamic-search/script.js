$(document).ready(() => {

    // Grab all the elements apart from the magnifier
    $('.deactivable').addClass('deactivated');

    // When clicking the magnifier activate the buttons
    $('#img-magnifier').click(() => {

        // Grab deactivable objects
        $('.deactivable').toggleClass('deactivated');
    })
})
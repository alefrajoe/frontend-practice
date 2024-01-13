$(document).ready(
    () => {
        
        // Hide the image
        $('#image-uploaded').hide();

        // When an image is uploaded show the image
        $('#image-uploader').change((e) => {

            // Define a file reader object
            const file = e.target.files[0];

            // If file has been uploaded
            if (file){

                // Define a file reader object
                const reader = new FileReader();

                // Define onload for the reader
                reader.onload = function (file){

                    // Upload the image as a src
                    $('#image-uploaded').attr('src', file.target.result);

                    // Show the image
                    $('#image-uploaded').show();
                }

                // Use the reader to read the data
                reader.readAsDataURL(file);
            }
        })
    }
);
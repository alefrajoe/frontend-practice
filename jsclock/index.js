
// Define function to update the time
function updateTime(){

    // Get the current time
    let date = new Date();

    // Define an array to contain the time
    let time = [];
    let meridian = null;

    // Get the current timestamp
    time.push(date.getHours());
    time.push(date.getMinutes());
    time.push(date.getSeconds());

    // Map time elements
    time = time.map((value) => {if (String(value).length <= 1) {return "0" + String(value);} else {return String(value);}})

    // Get AM/PM
    if (Number(time[0]) >= 12) {meridian = "  PM";}
    else {meridian = "  AM";}

    // Get the paragraph where we can set the time and the meridian
    document.getElementById('time-string').innerHTML = time.join(":") + "<span id='meridian'></span>";
    document.getElementById('meridian').innerHTML = meridian;
}

function dayDropdown(){

    // Define the day event we need to modify
    let day = ["lunch", "evening", "night"];

    // For all the events in the day
    for (elem of day){

        // Grab the corresponding paragraph
        let dayElem = document.getElementById(elem);
        
        // Set the innerHTML
        dayElem.innerHTML = `SET ${elem.toUpperCase()} TIME`;
        
        // Create the select item
        let node = document.createElement("select");
        
        // Set property of the node
        node.setAttribute('id', elem);

        // Define placeholder
        let option = document.createElement('option');
        option.id = 'placeholder' + '-' + elem;
        option.innerHTML = " ";
        node.appendChild(option);

        // Append range of time to the select item
        for(let i=0; i<24; i++){

            // Define an option
            let option = document.createElement('option');
            option.id = elem + '-' + String(i);
            option.value = i;
            option.innerHTML = String(i) + "-" + String(i+1);

            // Append to the node
            node.appendChild(option);
        }

        // Append the node
        dayElem.appendChild(node);
    }
}

function pressButton(){

    // Iniitalize an empty dictionary
    let dict = {};

    // Select all selectors
    let allSelect = document.querySelectorAll('select');

    // Loop over all of the elements
    for (let i=0; i<allSelect.length; i++){
        dict[allSelect[i].id] = Number(allSelect[i].value);
    }
    
    // Get the current hours
    let date = new Date();
    let hour = date.getHours();

    for(elem in dict){
        if (dict[elem] === hour){
            
            // Change the image
            document.getElementById('image-cat').src = "https://images.pexels.com/photos/45201/kitty-cat-kitten-pet-45201.jpeg";
        }
    }

}


dayDropdown();

// Get the button
let button = document.querySelector('.party-button').addEventListener('click', pressButton);

setInterval(updateTime, 1000);
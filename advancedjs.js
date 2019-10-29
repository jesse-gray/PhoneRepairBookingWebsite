//------------------DATE PICKER-----------------------
$(function() {
    $("#datepicker").datepicker({});
});

//--------------------3D MODEL------------------------


//-------------------GEOLOCATION----------------------
var output = document.getElementById("locationOutput");

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        output.innerHTML = "GeoLocation is not supported by this browser.";
    }
}

function showPosition(position) {
    output.innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

//-------------------DRAG & DROP----------------------
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//-------------------WEB STORAGE----------------------
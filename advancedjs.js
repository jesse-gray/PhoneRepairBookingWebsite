//------------------DATE PICKER-----------------------
$(function() {
    $("#datepicker").datepicker({});
});

//--------------Browser Compatibility-----------------
function checkBrowser() {
    var userAgent = navigator.userAgent;
    var opera = (userAgent.indexOf('Opera') != -1);
    var ie = (userAgent.indexOf('MSIE') != -1);
    var gecko = (userAgent.indexOf('Gecko') != -1);
    var netscape = (userAgent.indexOf('Mozilla') != -1);
    var version = navigator.appVersion;

    var output = "";;

    if (opera) {
        output = "Opera based browser";
    } else if (gecko) {
        output = "Mozilla based browser";
    } else if (ie) {
        doutput = "IE based browser";
    } else if (netscape) {
        output = "Netscape based browser";
    } else {
        output = "Unknown browser";
    }

    // You can include version to along with any above condition.
    output += "<br /> Browser version info : " + version;
    document.getElementById("browserOutput").innerHTML = output;
}

//-------------------GEOLOCATION----------------------
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locationOutput").innerHTML = "GeoLocation is not supported by this browser.";
    }
}

function showPosition(position) {
    document.getElementById("locationOutput").innerHTML = "Latitude: " + position.coords.latitude +
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
function storeData() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("name", document.getElementById('storageInput').value);
    }
    document.getElementById('storageInput').value = '';
}

function deleteData() {
    localStorage.removeItem("name");
}

function retrieveData() {
    if (localStorage.getItem("name") != null) {
        alert("Name in storage is: " + localStorage.getItem("name"));
    } else {
        alert("There is currently no name in local storage");
    }
}
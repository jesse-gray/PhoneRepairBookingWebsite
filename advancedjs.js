//------------------DATE PICKER-----------------------
$(function() {
    $("#datepicker").datepicker({});
});

//--------------------BROWSER INFO------------------------
function checkBrowser(){
    var userAgent   = navigator.userAgent;
    var opera       = (userAgent.indexOf('Opera') != -1);
    var ie          = (userAgent.indexOf('MSIE') != -1);
    var gecko       = (userAgent.indexOf('Gecko') != -1);
    var netscape    = (userAgent.indexOf('Mozilla') != -1);
    var version     = navigator.appVersion;

    var browserOutput = "";
    
    if (opera) {
        browserOutput += "Opera based browser";
        // Keep your opera specific URL here.
    } else if (gecko) {
        browserOutput += "Mozilla based browser";
        // Keep your gecko specific URL here.
    } else if (ie) {
        browserOutput += "IE based browser";
        // Keep your IE specific URL here.
    } else if (netscape) {
        browserOutput += "Netscape based browser";
        // Keep your Netscape specific URL here.
    } else {
        browserOutput += "Unknown browser";
    }
    
    //Output to HTML
    browserOutput += "<br /> Browser version info : " + version;
    document.getElementById("browserOutput").innerHTML = browserOutput;
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
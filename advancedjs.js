//================DATE PICKER==================

//Turns input into a datepicker
$(function() {
    $("#datepicker").datepicker({});
});

//==================BROWSER INFO==================

//Gets browser details of device
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
    } else if (gecko) {
        browserOutput += "Mozilla based browser";
    } else if (ie) {
        browserOutput += "IE based browser";
    } else if (netscape) {
        browserOutput += "Netscape based browser";
    } else {
        browserOutput += "Unknown browser";
    }
    
    //Output to HTML
    browserOutput += "<br /> Browser version info : " + version;
    document.getElementById("browserOutput").innerHTML = browserOutput;
}


//==================GEOLOCATION==================

//Gets lcocation of device
function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        document.getElementById("locationOutput").innerHTML = "GeoLocation is not supported by this browser.";
    }
}

//Outputs to HTML
function showPosition(position) {
    document.getElementById("locationOutput").innerHTML = "Latitude: " + position.coords.latitude +
        "<br>Longitude: " + position.coords.longitude;
}

//==================DRAG & DROP==================

//Lets image be dropped in box
function allowDrop(ev) {
    ev.preventDefault();
}

//Move image from box to box
function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

//Drop image in box
function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("text");
    ev.target.appendChild(document.getElementById(data));
}

//==================WEB STORAGE==================

//Store name in web storage
function storeData() {
    if (typeof(Storage) !== "undefined") {
        localStorage.setItem("name", document.getElementById('storageInput').value);
    }
    document.getElementById('storageInput').value = '';
}

//Delete name in web storage
function deleteData() {
    localStorage.removeItem("name");
}

//Get name from web storage
function retrieveData() {
    if (localStorage.getItem("name") != null) {
        alert("Name in storage is: " + localStorage.getItem("name"));
    } else {
        alert("There is currently no name in local storage");
    }
}
$(function() {
    $("#purchasedate").datepicker({ minDate: -20, maxDate: "+1M +15D" });
});

$(function() {
    $("#repairdate").datepicker({ minDate: -20, maxDate: "+1M +15D" });
});

$(document).ready(function() {
    //When the document is ready
    $('form').submit(function(e) {
        //When user clicks submit button, check the entered values
        //Prevent the default action : send to server
        e.preventDefault();

        //Get entered vales and check thier valididty
        var customerType = $('input[name="customertype"]:checked').val();
        var title = $('#title option:selected').text();
        var firstName = $('input#firstname').val();
        var lastName = $('input#lastname').val();
        var street = $('input#street').val();
        var city = $('input#city').val();
        var postCode = $('input#postcode').val();
        var phoneNumber = $('input#phonenumber').val();
        var email = $('input#email').val();
        var imeiNumber = $('input#imeinumber').val();
        var make = $('#make option:selected').text();
        var faultCategory = $('#faultcategory option:selected').text();
        var description = $('input#description').val();

        //Dates
        var d = $('input#purchasedate').val();
        var date = d.split("/");
        var purchaseDate = new Date(date[2], date[0] - 1, date[1]);
        d = $('input#repairdate').val();
        date = d.split("/");
        var repairDate = new Date(date[2], date[0] - 1, date[1]);

        console.log("Test value = " + make);

        //Check values

        // //Check customerType
        // if (customerType == undefined) {
        //     //Invalid values
        //     //Display an error message
        //     $('fieldset#customertype').after('<p class="error_message">Please enter a customer type</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check title
        // if (title == "Select title") {
        //     //Invalid values
        //     //Display an error message
        //     $('select#title').after('<p class="error_message">Please enter your title</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check firstName
        // var patt = new RegExp(/^[a-zA-Z0-9- ]*$/)
        // if (!(patt.test(firstName)) || firstName == null) {
        //     //Invalid values
        //     //Display an error message
        //     $('input#firstname').after('<p class="error_message">Please enter a valid first name</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check lastName
        // var patt = new RegExp(/^[a-zA-Z0-9- ]*$/)
        // if (!(patt.test(lastName)) || lastName == null) {
        //     //Invalid values
        //     //Display an error message
        //     $('input#lastname').after('<p class="error_message">Please enter a valid last name</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check street
        // if (street == "") {
        //     //Invalid values
        //     //Display an error message
        //     $('input#street').after('<p class="error_message">Please enter your street</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check city
        // if (city == "") {
        //     //Invalid values
        //     //Display an error message
        //     $('input#city').after('<p class="error_message">Please enter your city</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check postCode
        // if (!(postCode.length == 4)) {
        //     //Invalid values
        //     //Display an error message
        //     $('input#postcode').after('<p class="error_message">Please enter a valid postcode</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check phoneNumber
        // var patt = new RegExp(/^[0-9-()+ ]*$/)
        // if (!(patt.test(phoneNumber)) || phoneNumber == "") {
        //     //Invalid values
        //     //Display an error message
        //     $('input#phonenumber').after('<p class="error_message">Please enter a valid phone number</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check email
        // if (email.indexOf("@") > email.indexOf(".") || email.length < 5) {
        //     //Invalid values
        //     //Display an error message
        //     $('input#email').after('<p class="error_message">Please enter a valid email</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check purchaseDate
        // if (purchaseDate > Date.now() || purchaseDate == "Invalid Date") {
        //     //Invalid values
        //     //Display an error message
        //     $('input#purchasedate').after('<p class="error_message">Please enter a valid purchase date</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check repairDate
        // if (repairDate > Date.now() || repairDate < purchaseDate || repairDate == "Invalid Date") {
        //     //Invalid values
        //     //Display an error message
        //     $('input#repairdate').after('<p class="error_message">Please enter a valid repair date</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        // //Check imeiNumber
        // var patt = new RegExp(/^[0-9]*$/)
        // if (imeiNumber.length != 15 || !(patt.test(imeiNumber))) {
        //     //Invalid values
        //     //Display an error message
        //     $('input#imeinumber').after('<p class="error_message">Please enter a valid IMEI number</p>')
        //         //Stop Checking and quit
        //     return false
        // }

        //Check make
        if (false) {
            //Invalid values
            //Display an error message
            $('input#make').after('<p class="error_message">Please enter the make</p>')
                //Stop Checking and quit
            console.log("test failed successfully")
            return false
        }

        //Check faultCategory
        if (false) {
            //Invalid values
            //Display an error message
            $('input#faultcategory').after('<p class="error_message">Please enter the fault category</p>')
                //Stop Checking and quit
            return false
        }

        //Check description
        if (false) {
            //Invalid values
            //Display an error message
            $('input#description').after('<p class="error_message">Please enter a description</p>')
                //Stop Checking and quit
            return false
        }

        //Call to execute a function displayInvoice()
        //displayInvoice(...);
    });

    //When users enter data, make all error_messages disapear
    $('input').focus(function() {
        //Make all errormessages disappear
        $('p.error_message').hide();
    });
});

function addPhone() {
    var item = document.getElementById("itemType").value;
    var cost;
    if (item == "iPhone X") {
        cost = 275;
    } else {
        cost = 100;
    }
    $("#itemList tbody").append(
        "<tr id='phoneRow'>" +
        "<td>" + item + "</td>" +
        "<td class='cost'>" + cost + "</td>" +
        "</tr>"
    );

    $('#addPhoneBtn').hide();
    $('.phoneSelection').hide();
    $('#removePhoneBtn').show();
    updateCost();
}

function addCharger() {
    $("#itemList tbody").append(
        "<tr id='chargerRow'>" +
        "<td>Charger</td>" +
        "<td class='cost'>30</td>" +
        "</tr>"
    );
    $('#addChargerBtn').hide();
    $('#removeChargerBtn').show();
    updateCost();
}

function removePhone() {
    $('#phoneRow').remove();
    $('#addPhoneBtn').show();
    $('.phoneSelection').show();
    $('#removePhoneBtn').hide();
    updateCost();
}

function removeCharger() {
    $('#chargerRow').remove();
    $('#addChargerBtn').show();
    $('#removeChargerBtn').hide();
    updateCost();
}

function updateCost() {
    //Bond field
    var sum = 0;
    if (!document.getElementById('typebusiness').checked) {
        //Total the cost of items in the table
        $('.cost').each(function() {
            var value = $(this).text();
            sum += parseFloat(value);
        });
    }
    document.getElementById("bond").value = convertToMoney(sum);

    //Service Fee field
    if (!document.getElementById("warranty").checked) {
        service = 85;
    } else {
        service = 0;
    }
    document.getElementById("service").value = convertToMoney(service);

    //Total field
    total = sum + service;
    document.getElementById("total").value = convertToMoney(total);

    //GST field
    gst = total * 0.15;
    document.getElementById("gst").value = convertToMoney(gst);

    //Total(+GST) field
    grandTotal = total + gst;
    document.getElementById("grandtotal").value = convertToMoney(grandTotal);
}

function convertToMoney(aPrice) {
    return "$" + aPrice.toFixed(2);
}

function openFAQ() {
    var faqWindow = window.open("faq.html", "_blank")
}

function clearForm() {
    $("#itemList tbody tr").remove();
    $('p.error_message').hide();
}

//----------FAQ Page----------
//Loads RSS document
function loadRSS() {
    //Use CORS API website as proxy to retrieve XML file
    var proxy = 'https://cors-anywhere.herokuapp.com/';
    var url = "jessegray.coolpage.biz/json/faqs.json";

    //Declare XMLHttpRequest Object
    var xmlhttp = new XMLHttpRequest();
    //Send a request from Client side to Server to retrieve the xml document
    xmlhttp.open("GET", proxy + url, true);
    xmlhttp.send();
    //Check if the entire xml document has been received? If so, process it.
    xmlhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var myArr = JSON.parse(this.responseText);
            //Load XML document as XML format and process
            processJSON(myArr);
        }
    };
}

//Finds relevant data in document and displays it on the webpage
function processJSON(arr) {
    var output = "";
    for (var i = 0; i < arr.length; i++) {
        //Display extracted article into the divs
        output += '<div class="faqArticle"><h3>' + arr[i].question + '</h3><p>' + arr[i].answer + '</p></div>';
    }
    document.getElementById("faqMain").innerHTML = output;
}
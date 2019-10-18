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
        var purchaseDate = $('input#purchasedate').val();
        var repairDate = $('input#repairdate').val();
        var imeiNumber = $('input#imeinumber').val();
        var make = $('#make option:selected').val();
        var faultCategory = $('#faultcategory option:selected').val();
        var description = $('input#description').val();

        //Check values

        //Call to execute a function displayInvoice()
        //displayInvoice(...);
    })
})

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
$(function() {
    $("#purchasedate").datepicker({});
});

$(function() {
    $("#repairdate").datepicker({});
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
        var description = $('textarea#description').val();

        //Dates
        var d = $('input#purchasedate').val();
        var date = d.split("/");
        var purchaseDate = new Date(date[2], date[0] - 1, date[1]).toLocaleDateString('en');
        d = $('input#repairdate').val();
        date = d.split("/");
        var repairDate = new Date(date[2], date[0] - 1, date[1]).toLocaleDateString('en', { hour: 'numeric', minute: 'numeric', hour12: true }).toLocaleLowerCase();

        //Check values
        //Check customerType
        if (customerType == undefined) {
            //Invalid values
            //Display an error message
            $('fieldset#customertype').after('<p class="error_message">Please enter a customer type</p>')
                //Stop Checking and quit
            return false
        }

        //Check title
        if (title == "Select title") {
            //Invalid values
            //Display an error message
            $('select#title').after('<p class="error_message">Please enter your title</p>')
                //Stop Checking and quit
            return false
        }

        //Check firstName
        var patt = new RegExp(/^[a-zA-Z0-9- ]*$/)
        if (!(patt.test(firstName)) || firstName == null) {
            //Invalid values
            //Display an error message
            $('input#firstname').after('<p class="error_message">Please enter a valid first name</p>')
                //Stop Checking and quit
            return false
        }

        //Check lastName
        var patt = new RegExp(/^[a-zA-Z0-9- ]*$/)
        if (!(patt.test(lastName)) || lastName == null) {
            //Invalid values
            //Display an error message
            $('input#lastname').after('<p class="error_message">Please enter a valid last name</p>')
                //Stop Checking and quit
            return false
        }

        //Check street
        if (street == "") {
            //Invalid values
            //Display an error message
            $('input#street').after('<p class="error_message">Please enter your street</p>')
                //Stop Checking and quit
            return false
        }

        //Check city
        if (city == "") {
            //Invalid values
            //Display an error message
            $('input#city').after('<p class="error_message">Please enter your city</p>')
                //Stop Checking and quit
            return false
        }

        //Check postCode
        if (!(postCode.length == 4 || postCode.length == 0)) {
            //Invalid values
            //Display an error message
            $('input#postcode').after('<p class="error_message">Please enter a valid postcode</p>')
                //Stop Checking and quit
            return false
        }

        //Check phoneNumber
        var patt = new RegExp(/^[0-9-()+ ]*$/)
        if (!(patt.test(phoneNumber)) || phoneNumber == "") {
            //Invalid values
            //Display an error message
            $('input#phonenumber').after('<p class="error_message">Please enter a valid phone number</p>')
                //Stop Checking and quit
            return false
        }

        //Check email
        var patt = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
        if (!(patt.test(email)) || email.length < 5) {
            //Invalid values
            //Display an error message
            $('input#email').after('<p class="error_message">Please enter a valid email</p>')
                //Stop Checking and quit
            return false
        }

        //Check purchaseDate
        if (Date.parse(purchaseDate) > Date.now() || purchaseDate == "Invalid Date") {
            //Invalid values
            //Display an error message
            $('input#purchasedate').after('<p class="error_message">Please enter a valid purchase date</p>')
                //Stop Checking and quit
            return false
        }

        //Check repairDate
        if (Date.parse(repairDate) > Date.now() || Date.parse(repairDate) < Date.parse(purchaseDate) || repairDate == "Invalid Date") {
            //Invalid values
            //Display an error message
            $('input#repairdate').after('<p class="error_message">Please enter a valid repair date</p>')
                //Stop Checking and quit
            return false
        }

        //Check imeiNumber
        var patt = new RegExp(/^[0-9]*$/)
        if (imeiNumber.length != 15 || !(patt.test(imeiNumber))) {
            //Invalid values
            //Display an error message
            $('input#imeinumber').after('<p class="error_message">Please enter a valid IMEI number</p>')
                //Stop Checking and quit
            return false
        }

        //Check make
        if (make == "Select make") {
            //Invalid values
            //Display an error message
            $('select#make').after('<p class="error_message">Please enter the make</p>')
                //Stop Checking and quit
            return false
        }

        //Check faultCategory
        if (faultCategory == "Select category") {
            //Invalid values
            //Display an error message
            $('select#faultcategory').after('<p class="error_message">Please enter the fault category</p>')
                //Stop Checking and quit
            return false
        }

        //Check description
        if (description == "") {
            //Invalid values
            //Display an error message
            $('textarea#description').after('<p class="error_message">Please enter a description</p>')
                //Stop Checking and quit
            return false
        }

        //Call to execute a function displayInvoice()
        generateInvoiceID();
        displayInvoice((title + " " + firstName + " " + lastName), formatAddress(), phoneNumber, email, purchaseDate, repairDate, $('#warranty').is(':checked'), imeiNumber, make, $('input#model').val(), faultCategory, description, $('#itemList').prop('outerHTML'), $('#bond').val(), $('#service').val(), $('#total').val(), $('#gst').val(), $('#grandtotal').val());
    });

    //When users enter data, make all error_messages disapear
    $('input').focus(function() {
        //Make all errormessages disappear
        $('p.error_message').hide();
    });

    $('select').focus(function() {
        //Make all errormessages disappear
        $('p.error_message').hide();
    });

    $('textarea').focus(function() {
        //Make all errormessages disappear
        $('p.error_message').hide();
    });
});

function formatAddress() {
    var output = "";
    output += $('input#street').val() + "<br>";
    if ($('input#suburb').val() != "") {
        output += $('input#suburb').val() + ", ";
    }
    output += $('input#city').val();
    if ($('input#postcode').val().length != 0) {
        output += ", " + $('input#postcode').val();
    }
    return output;
}

//----------------------------------------------------------------
//Courtesy Phone table

function addPhone() {
    var item = document.getElementById("itemType").value;
    var cost;
    //Determine cost
    if (item.includes("iPhone")) {
        cost = 275;
    } else if (item == "Select a phone") {
        return;
    } else {
        cost = 100;
    }
    //Add to table
    $("#itemList tbody").append(
        "<tr id='phoneRow'>" +
        "<td id='courtesyPhone'>" + item + "</td>" +
        "<td class='cost'>" + cost + "</td>" +
        "</tr>"
    );

    //Update button visibilty
    $('#addPhoneBtn').hide();
    $('.phoneSelection').hide();
    $('#removePhoneBtn').show();
    updateForm();
}

function addCharger() {
    //Add to table
    $("#itemList tbody").append(
        "<tr id='chargerRow'>" +
        "<td id='courtesyCharger'>Charger</td>" +
        "<td class='cost'>30</td>" +
        "</tr>"
    );
    //Update visibilty
    $('#addChargerBtn').hide();
    $('#removeChargerBtn').show();
    updateForm();
}

function removePhone() {
    //Remove from table
    $('#phoneRow').remove();
    //Update visibilty
    $('#addPhoneBtn').show();
    $('.phoneSelection').show();
    $('#removePhoneBtn').hide();
    updateForm();
}

function removeCharger() {
    //Remove from table
    $('#chargerRow').remove();
    //Update button visibilty
    $('#addChargerBtn').show();
    $('#removeChargerBtn').hide();
    updateForm();
}

function updateForm() {
    //Warranty field
    var d = $('input#purchasedate').val();
    var date = d.split("/");
    var purchaseDate = new Date(date[2], date[0] - 1, date[1]);
    if (((Date.now() - purchaseDate) / 2.628e+9) > 24) {
        $('input#warranty').prop('checked', false);
    } else {
        $('input#warranty').prop('checked', true);
    }

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

//-------------------------------------------------------------------
function generateInvoiceID() {
    if (localStorage.invoiceid) {
        localStorage.invoiceid = Number(localStorage.invoiceid) + 1;
    } else {
        localStorage.invoiceid = 100000;
    }
}

function displayInvoice(custName, custAddress, custPhone, custEmail, purchaseDate, repairDate, warranty, imei, make, model, fault, description, table, bond, service, total, gst, grandTotal) {
    //create a "blank page"
    let invoiceWindow = window.open('', '_blank');

    //Declare dates
    let dateNow = new Date();
    let dateFuture = new Date(dateNow);
    dateFuture.setDate(dateNow.getDate() + 5)
    const months = ["January", "February", "March",
        "April", "May", "June", "July", "August", "September",
        "October", "November", "December"
    ];

    //Build the "invoice page": is an HTML document
    invoiceWindow.document.write(
        `
        <html>
        <head>
            <title>Repair Booking Sheet</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <link rel="stylesheet" href="css/invoice-style.css">   
        </head>                    
        `
    );

    //Write the body section for the page
    invoiceWindow.document.write(
        `
        <body>
        <header>
            <h1 class="title-area">Repair Booking</h1>
            <div id="dueDetails">
                <h4>Amount Due</h4>
                <h3>${grandTotal}</h3>
            </div>
        </header>
    
        <main>
            <section id="invoiceInfo">
                <div id="customerInfo">
                    <h3>Customer</h3>
                    <br>
                    <p id="customerDetails">${custName}<br>${custAddress}<br>${custPhone}<br>${custEmail}<br></p>
                </div>
                <div id="jobInfo" class="container">
                    <h3>Repair Job</h3>
                    <div class="list">
                        <h4>Job Number:</h4>
                        <p>${localStorage.getItem("invoiceid")}</p>
                        <h4>Invoice Date:</h4>
                        <p>${months[dateNow.getMonth()] + " " + dateNow.getDate() + ", " + dateNow.getFullYear() + " - " + dateNow.getHours() + ":" + dateNow.getMinutes()}</p>
                        <h4>Payment Date:</h4>
                        <p>${months[dateFuture.getMonth()] + " " + dateFuture.getDate() + ", " + dateFuture.getFullYear()}</p>    
                    </div>
                </div>
            </section>
            <hr>
            <section id="invoiceDetails">
            <div id="repairInfo" class="container">
                <h2>Repair Details</h2>
                    <div class="list">
                        <h4>Purchase Date:</h4>
                        <p>${purchaseDate}</p>
                        <h4>Repair Date/Time:</h4>
                        <p>${repairDate}</p>
                        <h4>Under Warranty:</h4>
        `
    );
    if (warranty) {
        invoiceWindow.document.write(
            `
            <p>Yes &#10004;</p>            
            `
        )
    } else {
        invoiceWindow.document.write(
            `
            <p>No &#10006;</p>            
            `
        )
    }
    invoiceWindow.document.write(
        `
                        <h4>IMEI Number:</h4>
                        <p>${imei}</p>
                        <h4>Device Make:</h4>
                        <p>${make}</p>
                        <h4>Model Number:</h4>
                        <p>${model}</p>
                        <h4>Fault Category:</h4>
                        <p>${fault}</p>
                        <h4>Description:</h4>
                        <p>${description}</p>
                    </div>
                </div>
        `
    );
    if ($('#itemList tr').length > 1) {
        invoiceWindow.document.write(
            `
                <div id="loanInfo" class="container">
                    <h2>Courtesy Loan Device Details</h2>
                    <div class="list">
                        ${table}
                    </div>
                </div>
        `);
    }
    invoiceWindow.document.write(
        `
                <div id="costInfo" class="container">
                    <h2>Totals</h2>
                    <div class="list">
                        <h4>Bond:</h4>
                        <p>${bond}</p>
                        <h4>Service Fee:</h4>
                        <p>${service}</p>
                        <h4>Total:</h4>
                        <p>${total}</p>
                        <h4>GST:</h4>
                        <p>${gst}</p>
                        <h4>Total(+GST):</h4>
                        <p>${grandTotal}</p>
                    </div>
                </div>
            </section>
        </main>
    
        <!--Footer Section-->
        <footer>
            <div id="companyInfo" class="container">
                <h3>Phone Fix Services</h3>
                <p>42 Fuxed It Drive<br>
                Alexander<br>
                New Zealand<br>
                4342</p>
            </div>
            <div id="contactInfo" class="container">
                <h3>Contact Us</h3>
                <p><span style="font-weight: bold">Phone: </span>06876543<br>
                <span style="font-weight: bold">Email: </span>phonefix@email.com</p>
    
            </div>
        </footer>
        </body>
        </html>
        `
    );
}
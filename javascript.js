function addItem() {
    var item = document.getElementById("itemType").value;
    var cost;
    switch (item) {
        case "iPhone":
            cost = 275;
            break;
        case "Other Phone":
            cost = 100;
            break;
        case "Charger":
            cost = 30;
            break;
        default:
            cost = 0;
            break;
    }
    $("#itemList tbody").append(
        "<tr>" +
        "<td>" + item + "</td>" +
        "<td class='cost'>" + cost + "</td>" +
        "</tr>"
    );
    updateCost();
}

function updateCost() {
    //Declare variables
    // var bond = ;
    // var service = ;
    // var total = ;
    // var gst = document.getElementById("gst").value;
    // var grandtotal = document.getElementById("grandtotal").value;

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
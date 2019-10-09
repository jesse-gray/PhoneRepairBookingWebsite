// $(document).ready(function() {
//     // Wait for the DOM to be ready
//     $(function() {
//         // Initialize form validation on the registration form.
//         // It has the name attribute "registration"
//         $("form[name='form']").validate({
//             // Specify validation rules
//             rules: {
//                 // The key name on the left side is the name attribute
//                 // of an input field. Validation rules are defined
//                 // on the right side
//                 customertype: "required",
//                 firstname: "required",
//                 lastname: "required",
//                 street: "required",
//                 city: "required",
//                 phonenumber: "required",
//                 email: {
//                     required: true,
//                     // Specify that email should be validated
//                     // by the built-in "email" rule
//                     email: true
//                 },
//                 purchasedate: "required",
//                 repairdate: "required",
//                 imeinumber: "required",
//                 description: "required"
//             },
//             // Specify validation error messages
//             messages: {
//                 customertype: "Please select a customer type",
//                 firstname: "Please enter your firstname",
//                 lastname: "Please enter your lastname",
//                 street: "Please enter your street address",
//                 city: "Please enter your city",
//                 phonenumber: "Please enter your phone number",
//                 email: "Please enter a valid email address",
//                 purchasedate: "Please enter the purchase date",
//                 repairdate: "Please enter the repair date",
//                 imeinumber: "Please enter the IMEI number",
//                 description: "Please enter a description of the fault"
//             },
//             // Make sure the form is submitted to the destination defined
//             // in the "action" attribute of the form when valid
//             submitHandler: function(form) {
//                 form.submit();
//             }
//         });
//     });
// })

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
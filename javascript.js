$(document).ready(function() {
    // Wait for the DOM to be ready
    $(function() {
        // Initialize form validation on the registration form.
        // It has the name attribute "registration"
        $("form[name='registration']").validate({
            // Specify validation rules
            rules: {
                // The key name on the left side is the name attribute
                // of an input field. Validation rules are defined
                // on the right side
                customertype: "required",
                firstname: "required",
                lastname: "required",
                street: "required",
                city: "required",
                phonenumber: "required",
                email: {
                    required: true,
                    // Specify that email should be validated
                    // by the built-in "email" rule
                    email: true
                },
                purchasedate: "required",
                repairdate: "required",
                imeinumber: "required",
                description: "required"
            },
            // Specify validation error messages
            messages: {
                customertype: "Please select a customer type",
                firstname: "Please enter your firstname",
                lastname: "Please enter your lastname",
                street: "Please enter your street address",
                city: "Please enter your city",
                phonenumber: "Please enter your phone number",
                email: "Please enter a valid email address",
                purchasedate: "Please enter the purchase date",
                repairdate: "Please enter the repair date",
                imeinumber: "Please enter the IMEI number",
                description: "Please enter a description of the fault"
            },
            // Make sure the form is submitted to the destination defined
            // in the "action" attribute of the form when valid
            submitHandler: function(form) {
                form.submit();
            }
        });
    });
})
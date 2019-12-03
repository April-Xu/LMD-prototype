
// Validate Contact Form
$("#ContactForm").validate({
    rules: {
        f_name: {
            required: true,
            minlength: 3
        },
        l_name: {
            required: true,
            minlength: 3
        },        
        email: {
            required: true,
            minlength: 4
        },
        mobile: {
            required: true
        },
        subject: {
            required: true
        },
        message: {
            required: true
        }
    },
    messages: {
        f_name: {
            required: "Please Enter first Name",
            minlength: "Name must consist of at least 3 characters"
        },
        l_name: {
            required: "Please Enter last Name",
            minlength: "Name must consist of at least 3 characters"
        },        
        email: {
            required: "Please provide a Email",
            minlength: "Email must be at least 4 characters long"
        },
        mobile: {
            required: "Please provide Mobile Number"
        },
        subject: {
            required: "Please Enter Subject"
        },
        message: {
            required: "Please Enter Message"
        }
    },

    submitHandler: function(form) {
        //Send Booking Mail AJAX
        var formdata = jQuery("#ContactForm").serialize();
        jQuery.ajax({
            type:"POST",
            url:"contact_form/contact.php",
            data:formdata,
            dataType:'json',
            async: false,
            success:function(data){
                if(data.success){
                    alert('Thank You, Your Message Has been Sent');
                }else{
                    alert('Error on Sending Message, Please Try Again');
                }

            },
            error:function(error){
                alert('Something Went Wrong');
            }

        });
    }
});


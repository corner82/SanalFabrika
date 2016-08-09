
var sm = $(window).successMessage();
var wm = $(window).warningMessage();


/*
 * Show or hide password content
 * @author: Bahram Lotfi Sadigh
 * @Since: 2016.2.1
 * 
 */
function showPassword() {

    if ($('#password').attr('type') === 'text') {
        $('#password').attr('type', 'password');
        $('#password_repeat').attr('type', 'password');
    } else {
        $('#password').attr('type', 'text');
        $('#password_repeat').attr('type', 'text');
    }
}

function confirmPass() {
    if ($('#password').val() !== '') {
        if ($('#password').val() === $('#password_repeat').val()) {
            sm.successMessage('show',
                    "Congratulation"
//            window.lang.translate("Congratulation")
                    ,
                    "Password confirmed successfully"
//                    window.lang.translate("Password confirmed successfully")
                    );
        } else {
            wm.warningMessage('show',
                    "Oops"
//            window.lang.translate("Oops")
                    ,
                    "Please check your password. Repeated password must be exactely similar to your provided password..."
//            window.lang.translate("Please check your password. Repeated password must be exactely similar to your provided password...")
                    );
        }
    } else {
        wm.warningMessage('show', "Oops"
//        window.lang.translate("Oops")
                ,
                "Please select a password..."
//                window.lang.translate("Please select a password...")
                );
    }
}


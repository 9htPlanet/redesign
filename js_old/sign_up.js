$('document').ready(function() {
    $(function() {

        //Вход
        $("#log_in_id").submit(function(event) {
            LogInFoo('log_in_email', 'log_in_password');
            event.preventDefault();
        });

        $("#log_in_id_popup").submit(function(event) {
            LogInFoo('log_in_email_popup', 'log_in_password_popup');
            event.preventDefault();
        });


        //Регистрация
        $("#sign_up_id").submit(function(event) {
            SignUpFoo('firstName_id', 'lastName_id', 'email_id', 'sign_up_password');
            event.preventDefault();
        });

        $("#sign_up_id_popup").submit(function(event) {
            SignUpFoo('firstName_id_popup', 'lastName_id_popup', 'email_id_popup', 'sign_up_password_popup');
            event.preventDefault();
        });






        function SignUpFoo(firstNameId, lastNameId, emailId, signUpPasswordId) {
            let firstName_id = document.getElementById(firstNameId).value;
            let lastName_id = document.getElementById(lastNameId).value;
            let email_id = document.getElementById(emailId).value;
            let psw_id = document.getElementById(signUpPasswordId).value;

            $(function() {

                let chb_1 = $('#chb_1').prop('checked');
                let chb_2 = $('#chb_2').prop('checked');
                let checkEmail = checkmail(email_id);
                let checkPassword = CheckPassword(psw_id);

                console.log(checkPassword);
                if (chb_2 && checkEmail) {
                    let msg = '';
                    $('.error_msg').html(msg);
                    // document.getElementById('error_id').innerHTML = msg;

                    $.post("https://api.9thplanet.ca/auth/reg", {
                            firstName: firstName_id,
                            lastName: lastName_id,
                            email: email_id,
                            password: psw_id
                        },
                        function(data) {
                            window.localStorage.setItem('Token', data['access']['accessToken']);
                            document.location.href = "profile.html"
                        }
                    )
                }
                if (!checkEmail) {

                    let msg = 'Your e-mail is incorrect, Please check it';
                    // document.getElementById('error_id').innerHTML = msg;
                    $('.error_msg').html(msg);


                }
                if (!checkPassword) {
                    let msg = 'Password is incorrect. Please check your password.The password has to contain 6-30 symbols';
                    // document.getElementById('error_id').innerHTML = msg;
                    $('.error_msg').html(msg);

                }

            });

        }

        function LogInFoo(loginId, passId) {
            let log_in_email = document.getElementById(loginId).value;

            let log_in_password = document.getElementById(passId).value;

            $(function() {

                $.post("https://api.9thplanet.ca/auth", { email: log_in_email, password: log_in_password },
                        function(data) {
                            window.localStorage.setItem('Token', data.accessToken);
                            document.location.href = "index.html"
                        }

                    )
                    .fail(function(error) {
                        $('.error_msg').html(error.responseJSON['errorMessage']);
                    });

            });

        }


        function checkmail(email) {
            if (email == "") {
                return false
            }
            if (email.indexOf(".") == -1) {
                return false
            }
            if ((email.indexOf(",") >= 0) || (email.indexOf(";") >= 0) || (email.indexOf(" ") >= 0)) {
                return false
            }
            dog = email.indexOf("@");
            if (dog == -1) {
                return false
            }
            if ((dog < 1) || (dog > email.length - 5)) {
                return false
            }
            if ((email.charAt(dog - 1) == '.') || (email.charAt(dog + 1) == '.')) {
                return false
            }
            return true;
        }

        function CheckPassword(pswd) {
            if (pswd == "") {
                return false;
            }
            if (pswd.length < 6) {
                return false;
            }
            if (pswd.length > 30) {
                return false;
            }
            return true;
        }

    });

});
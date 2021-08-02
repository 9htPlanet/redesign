$('document').ready(function () {
    $(function () {

        //Вход
        $("#log_in_id").submit(function (event) {
            event.preventDefault();
            logInFoo('log_in_email', 'log_in_password');
            document.querySelector("#log_in_id").disabled = true
        });

        $("#log_in_id_popup").submit(function (event) {
            event.preventDefault();
            logInFoo('log_in_email_popup', 'log_in_password_popup');
        });


        //Регистрация
        $("#sign_up_id").submit(function (event) {
            event.preventDefault();
            signUpFoo('firstName_id', 'lastName_id', 'email_id', 'sign_up_password');
        });

        $("#sign_up_id_popup").submit(function (event) {
            event.preventDefault();
            signUpFoo('firstName_id_popup', 'lastName_id_popup', 'email_id_popup', 'sign_up_password_popup');
        });

        function signUpFoo(firstNameId, lastNameId, emailId, signUpPasswordId) {
            let firstName_id = document.getElementById(firstNameId).value;
            let lastName_id = document.getElementById(lastNameId).value;
            let email_id = document.getElementById(emailId).value;
            let psw_id = document.getElementById(signUpPasswordId).value;

            $(function () {
                $('.error_msg_small').html("");

                let chb_2 = $('#chb_2').prop('checked');
                let chb_3 = $('#chb_3').prop('checked');
                let checkEmail = checkmail(email_id);
                let checkPassword = CheckPassword(psw_id);
                let checkFirstName = checkFirstOrLastName(firstName_id)
                let checkLastName = checkFirstOrLastName(lastName_id)

                if (chb_2 && chb_3 && checkEmail && checkPassword && checkFirstName && checkLastName) {
                    $('.error_msg').html("");

                    apiPostJson("auth/reg", {
                        firstName: firstName_id,
                        lastName: lastName_id,
                        email: email_id,
                        password: psw_id
                    }).then(data => {
                        console.log("its ok")
                        if (data.access) {
                            window.localStorage.setItem('Token', data['access']['accessToken']);
                            if (AuthCallbacks.isWaiting()) {
                                hideAllLoginPopups()
                                updateCurrentUserInfo()
                                AuthCallbacks.executeCallbacks()
                            } else {
                                document.location.reload();
                            }
                        } else {
                            $('#email_error_id').html(data['errorMessage']);
                        }
                    }).catch(err => {
                        if (err instanceof PlanetNetworkError) {
                            if (err.code === 2) {
                                $('#email_error_id').html(err.message);
                            } else {
                                $('#error_id').html(err.message);
                            }
                        }
                    })

                } else {
                    if (!checkEmail) {
                        $('#email_error_id').html('Your e-mail is incorrect, Please check it');
                    }
                    if (!checkPassword) {
                        $('#password_error_id').html('Password is incorrect. Please check your password.The password has to contain 6 - 30 symbols');
                    }
                    if (!checkFirstName) {
                        $('#first_name_error_id').html("Please fill this field");
                    }
                    if (!checkLastName) {
                        $('#last_name_error_id').html("Please fill this field");
                    }

                    if (!chb_2 && !chb_3) {
                        $('.error_msg').html("Please sign agreements and prove that you are adult");
                    } else if (!chb_2) {
                        $('.error_msg').html("Please prove that you are adult");

                    } else {
                        $('.error_msg').html("Please sign all agreements");
                    }
                }
            });

        }

        function logInFoo(loginId, passId) {
            let log_in_email = document.getElementById(loginId).value;
            let log_in_password = document.getElementById(passId).value;

            $(function () {
                apiPostJson("auth", {email: log_in_email, password: log_in_password})
                    .then((data) => {
                        if (data.accessToken) {
                            window.localStorage.setItem('Token', data.accessToken);
                            if (AuthCallbacks.isWaiting()) {
                                hideAllLoginPopups()
                                updateCurrentUserInfo()
                                AuthCallbacks.executeCallbacks()
                            } else {
                                document.location.reload();
                            }

                        } else {
                            $('.error_msg').html(data['errorMessage']);
                        }
                    })
                    .catch(err => {
                        if (err instanceof PlanetNetworkError) {
                            $('.error_msg').html(err.message);
                        } else {
                            $('.error_msg').html("Unknown error occurred. Please check your network and try again.");
                        }
                    })
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

        function checkFirstOrLastName(name) {
            if (name === "") {
                return false;
            }
            if (name.length < 1) {
                return false;
            }
            return true;
        }

    });

});

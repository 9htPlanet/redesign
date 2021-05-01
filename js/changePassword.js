$("document").ready(function () {
    var changeForm = document.getElementById("change_id");
    changeForm.addEventListener("submit", function (event) {

        let oldPassword = document.getElementById('old_pass_id').value;
        let newPassword = document.getElementById('new_pass_id').value;
        let confirmPassword = document.getElementById('confirm_pass_id').value;
        let code = window.localStorage.getItem("code");

        checkPasswords(newPassword, confirmPassword);
        sendRequest(newPassword, code, oldPassword);

        event.preventDefault();

    });

});

let checkPasswords = function (newPassword, confirmPassword) {
    let error = document.querySelector(".error_msg-error");
    if (newPassword !== confirmPassword) {
        error.classList.remove("hidden");
        error.innerHTML = "Passwords don't match";
    } else {
        error.classList.add("hidden");
    }
}

let sendRequest = function (newPassword, code, oldPassword) {
    const params = {
        newPassword: newPassword,
        code: code,
        oldPassword: oldPassword
    }

    apiPostJson("auth/pass", params)
        .then((response) => {
            if (!response.errorMessage) {
                location.href = 'index.html'
            } else {
                let error = document.querySelector(".error_msg-error");
                error.classList.remove("hidden");
                error.innerHTML = response.errorMessage;
            }
        })


}
$("document").ready(function () {

    var resetForm = document.getElementById("forgot_id");
    resetForm.addEventListener("submit", function (event) {
        let email = document.getElementById("forgot_email_id").value;
        let btn = document.getElementById("btn_reset_submit");
        if (btn.innerHTML !== "Back to sign in") {
            const params = {
                email: email
            }
            apiGetJsonQuery("auth/pass", params)
                .then(function (response) {
                    orderComplete(response)
                })

        }
        backToSignIn();
        event.preventDefault();
    });


})

let orderComplete = function (response) {
    if (response) {
        document.querySelector(".result-message-success").classList.remove("hidden");
        let btn = document.getElementById("btn_reset_submit");
        btn.innerHTML = "Back to sign in";
    }
};
let backToSignIn = function () {
    let btn = document.getElementById("btn_reset_submit");
    if (btn.innerHTML === "Back to sign in") {
        btn.onclick = toggleModalForgotPassword();
        btn.onclick = toggleModalLogin();
    }
}



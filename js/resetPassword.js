$("document").ready(function () {

    var resetForm = document.getElementById("forgot_id");
    resetForm.addEventListener("submit", function (event) {
        let email = document.getElementById("forgot_email_id").value;
        const params = {
            email: email
        }
        apiGetJsonQuery("auth/pass", params)
            .then(function (response) {
                orderComplete(response)
            })

        event.preventDefault();
    });


})

var orderComplete = function (response) {
    if (response) {
        document.querySelector(".result-message-success").classList.remove("hidden");
        document.getElementById("btn_reset_submit").disabled = true;
    }
};


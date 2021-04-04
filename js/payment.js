function calculatePayment(money123) {
    let input = document.getElementById("donate_count");
    let stripeCommision = document.getElementById("paymentStripeId");
    let planetCommision = document.getElementById("paymentPlanetId");
    let paymentBtn = document.getElementById("button-text");
    input.oninput = function () {
        if (input.value > 0 && input.value <= money123) {
            let stripeCalc = (input.value * 0.029 + 0.3).toFixed(2); //(7.114).toFixed(2)
            let planetCalc = (input.value * 0.01).toFixed(2);
            let btnCalc = (input.value * 1 + stripeCalc * 1 + planetCalc * 1).toFixed(
                2
            );
            stripeCommision.innerHTML = stripeCalc;
            planetCommision.innerHTML = planetCalc;
            paymentBtn.innerHTML = "Pay " + btnCalc + " CAD";
        }
        if (input.value > money123) {
            let stripeCalc = (money123 * 0.029 + 0.3).toFixed(2); //(7.114).toFixed(2)
            let planetCalc = (money123 * 0.01).toFixed(2);
            let btnCalc = (money123 * 1 + stripeCalc * 1 + planetCalc * 1).toFixed(
                2
            );
            stripeCommision.innerHTML = stripeCalc;
            planetCommision.innerHTML = planetCalc;
            paymentBtn.innerHTML = "Pay " + btnCalc + " CAD";
        }
    };
}

function calc(input) {
    let stripeCommision = document.getElementById("paymentStripeId");
    let planetCommision = document.getElementById("paymentPlanetId");
    let paymentBtn = document.getElementById("button-text");

    let stripeCalc = (input.value * 0.029 + 0.3).toFixed(2); //(7.114).toFixed(2)
    let planetCalc = (input.value * 0.01).toFixed(2);
    let btnCalc = (input.value * 1 + stripeCalc * 1 + planetCalc * 1).toFixed(2);
    stripeCommision.innerHTML = stripeCalc;
    planetCommision.innerHTML = planetCalc;

    let result = "Pay " + btnCalc + " CAD";
    paymentBtn.innerHTML = result;
    return result;
}

function getMoneyById(dreamId) {
    let getFullPathDream = "dreams/" + dreamId;
    let money = 0;

    apiGetJson(getFullPathDream)
        .then(function (newData) {
            let balance = data["price"] - data["money"];
            money = balance / 1000;
        });
    return money;
}

function fillMoney(balance) {
    window.onclick = function (e) {
        var elem = e ? e.target : window.event.returnValue;
        if (elem.id === "fullPaymentButtonId") {
            let input = document.getElementById("donate_count");
            input.value = balance;
            calc(input);
        }
    };
}

$("document").ready(function () {
    let getDreamId = window.location.href.toString().split(".html?")[1];
    console.log(getDreamId);
    let getFullPathDream = "";

    if (window.location.href.toString().includes("profile.html")) {
        getFullPathDream = "dreams/my";
    } else {
        getFullPathDream = "dreams/" + getDreamId;
    }

    apiGetJson(getFullPathDream)
        .then(function (dataSrc) {

            let data = "";
            if (Array.isArray(dataSrc)) {
                data = dataSrc[dataSrc.length - 1]
            } else {
                data = dataSrc;
            }
            // console.log(Array.isArray(data))
            let balance = data["price"] - data["money"];
            let money123 = balance / 100;
            console.log(data["price"]);
            fillMoney(money123);
            calculatePayment(money123);
            let input = document.getElementById("donate_count");
            input.setAttribute("max", money123);
            $("#donate_count").on("input", function () {
                $(this).val((i, v) => Math.max(this.min, Math.min(this.max, v)));
            });
        });

    showPaymentForm(getDreamId);

});


function showPaymentForm(getDreamId) {
    var stripe = Stripe(
        "pk_test_51HQdT5HFUELd0t0Ai498kAvRxEb4BqIq7DyiQP0RYkc2Sjc1yQjuzqmallekbQClxFhtzqscrJXFxTEUF1FbifNF00oZ0oFqBx"
    );

    var elements = stripe.elements();
    var style = {
        base: {
            color: "#32325d",
            fontFamily: 'Arial, sans-serif',
            fontSmoothing: "antialiased",
            fontSize: "16px",
            "::placeholder": {}
        },
        invalid: {
            fontFamily: 'Arial, sans-serif',
            color: "#fa755a",
        }
    };
    var card = elements.create("card", {style: style});
    // Stripe injects an iframe into the DOM
    card.mount("#card-element");
    card.on("change", function (event) {
        // Disable the Pay button if there are no card details in the Element
        document.querySelector("button").disabled = event.empty;
        document.querySelector("#card-error").textContent = event.error ? event.error.message : "";
    });
    var form = document.getElementById("payment-form");
    form.addEventListener("submit", function (event) {
        var paymentAmount = parseInt(document.getElementById("donate_count").value) * 100
        apiPostJson("payment/createPaymentIntent", {donate: paymentAmount, dreamId: getDreamId})
            .then(function (data) {
                // Complete payment when the submit button is clicked
                payWithCard(stripe, card, data.secret);
            });

        event.preventDefault();

    });
}

// The items the customer wants to buy

function resetValue() {
    let input = document.getElementById("donate_count");
    input.value = "";
    let stripeComission = document.getElementById("paymentStripeId");
    stripeComission.innerText = 0;
    let planetComission = document.getElementById("paymentPlanetId");
    planetComission.innerText = 0;
    let btnText = document.getElementById("button-text");
    btnText.innerHTML = "Pay " + 0 + " CAD";
}

// Calls stripe.confirmCardPayment
// If the card requires authentication Stripe shows a pop-up modal to
// prompt the user to enter authentication details without leaving your page.
var payWithCard = function (stripe, card, clientSecret) {
    loading(true);
    stripe
        .confirmCardPayment(clientSecret, {
            payment_method: {
                card: card
            }
        })
        .then(function (result) {
            if (result.error) {
                // Show error to your customer
                showError(result.error.message);
            } else {
                // The payment succeeded!
                orderComplete(result.paymentIntent.id);
                resetValue();
            }
        });
};
/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function (paymentIntentId) {
    loading(false);
    document.querySelector(".result-message-success").classList.remove("hidden");
    document.querySelector("button").disabled = true;
};
// Show the customer the error from Stripe if their card fails to charge
var showError = function (errorMsgText) {
    loading(false);
    var errorMsg = document.querySelector("#card-error");
    errorMsg.textContent = errorMsgText;
    setTimeout(function () {
        errorMsg.textContent = "";
    }, 4000);
};
// Show a spinner on payment submission
var loading = function (isLoading) {
    if (isLoading) {
        // Disable the button and show a spinner
        document.querySelector("button").disabled = true;
        document.querySelector("#spinner").classList.remove("hidden");
        document.querySelector("#button-text").classList.add("hidden");
    } else {
        document.querySelector("button").disabled = false;
        document.querySelector("#spinner").classList.add("hidden");
        document.querySelector("#button-text").classList.remove("hidden");
    }
};

function CalculatePayment(money123) {
    let input = document.getElementById("paymentCadId");
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
            stripeCommision.innerHTML =
                "Stripe Commission-" +
                stripeCalc +
                " CAD " +
                '<span class="payment_WAT" title="Commision for payment system">What is it?</span>';
            planetCommision.innerHTML =
                "9-th Planet Commission-" + planetCalc + " CAD";
            paymentBtn.innerHTML = "Back it " + btnCalc + " CAD";
        }
        if (input.value > money123) {
            let stripeCalc = (money123 * 0.029 + 0.3).toFixed(2); //(7.114).toFixed(2)
            let planetCalc = (money123 * 0.01).toFixed(2);
            let btnCalc = (money123 * 1 + stripeCalc * 1 + planetCalc * 1).toFixed(
                2
            );
            stripeCommision.innerHTML =
                "Stripe Commission-" +
                stripeCalc +
                " CAD " +
                '<span class="payment_WAT" title="Commision for payment system">What is it?</span>';
            planetCommision.innerHTML =
                "9-th Planet Commission-" + planetCalc + " CAD";
            paymentBtn.innerHTML = "Back it " + btnCalc + " CAD";
        }
    };
}

function Calc(input) {
    let stripeCommision = document.getElementById("paymentStripeId");
    let planetCommision = document.getElementById("paymentPlanetId");
    let paymentBtn = document.getElementById("button-text");

    let stripeCalc = (input.value * 0.029 + 0.3).toFixed(2); //(7.114).toFixed(2)
    let planetCalc = (input.value * 0.01).toFixed(2);
    let btnCalc = (input.value * 1 + stripeCalc * 1 + planetCalc * 1).toFixed(2);
    stripeCommision.innerHTML =
        "Stripe Commission-" +
        stripeCalc +
        " CAD " +
        '<span class="payment_WAT" title="Commision for payment system">What is it?</span>';
    planetCommision.innerHTML = "9-th Planet Commission-" + planetCalc + " CAD";

    let result = "Back it " + btnCalc + " CAD";
    paymentBtn.innerHTML = result;
    return result;
}

function getMoneyById(dreamId) {
    apiGetJson(`dreams/${dreamId}`)
        .then(data => {
            let balance = data["price"] - data["money"];
            let input = document.getElementById("paymentCadId");
            input.value = balance / 1000;
            Calc(input);
        })
}

function FillMoney(dreamId) {
    window.onclick = function (e) {
        var elem = e ? e.target : window.event.returnValue;
        if (elem.id === "fullPaymentButtonId") {
            getMoneyById(dreamId);
        }
    };
}

function FillMoney2(balance) {
    window.onclick = function (e) {
        var elem = e ? e.target : window.event.returnValue;
        if (elem.id === "fullPaymentButtonId") {
            let input = document.getElementById("paymentCadId");
            input.value = balance;
            let calc = Calc(input);
        }
    };
}

$("document").ready(function () {
    let getDreamId = window.location.href.toString().split(".html?")[1];

    apiGetJson(`dreams/${getDreamId}`)
        .then(function (data) {
            let balance = data["price"] - data["money"];
            let money123 = balance / 1000;
            FillMoney2(money123);
            CalculatePayment(money123);
            let input = document.getElementById("paymentCadId");
            input.setAttribute("max", money123);
            $("#paymentCadId").on("input", function () {
                $(this).val((i, v) => Math.max(this.min, Math.min(this.max, v)));
            });
        })
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

        const paymentAmount = parseInt(document.getElementById("paymentCadId").value) * 100

        //Теперь вызываем метод createPaymentIntent
        const formData = {
            donate: paymentAmount,
            dreamId: getDreamId
        }

        apiPostJson("payment/createPaymentIntent", formData)
            .then(function (data) {
                // Complete payment when the submit button is clicked
                payWithCard(stripe, card, data.secret);
            });


        event.preventDefault();

    });
}

// The items the customer wants to buy


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
            }
        });
};
/* ------- UI helpers ------- */
// Shows a success message when the payment is complete
var orderComplete = function (paymentIntentId) {
    loading(false);
    // document
    //     .querySelector(".result-message")
    //     .setAttribute(
    //         "href",
    //         "https://dashboard.stripe.com/test/payments/" + paymentIntentId
    //     );
    document.querySelector(".result-message").classList.remove("hidden");
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


function PAY(getDreamId, money) {
    let token = window.localStorage.getItem("Token");
    var stripe = Stripe(
        "pk_test_51HQdT5HFUELd0t0Ai498kAvRxEb4BqIq7DyiQP0RYkc2Sjc1yQjuzqmallekbQClxFhtzqscrJXFxTEUF1FbifNF00oZ0oFqBx"
    );
    const formData = {
        dreamId: getDreamId,
        donate: money
    };

    document.querySelector("button").disabled = true;
    // const formData = new FormData();
    // formData.append("donate", money);
    // formData.append("dreamId", dreamId);

    apiPostJson("payment/createPaymentIntent", formData)
        .then(function (data) {
            var elements = stripe.elements();
            var style = {
                base: {
                    color: "#32325d",
                    fontFamily: "Arial, sans-serif",
                    fontSmoothing: "antialiased",
                    fontSize: "16px",
                    "::placeholder": {},
                },
                invalid: {
                    fontFamily: "Arial, sans-serif",
                    color: "#fa755a",
                },
            };
            var card = elements.create("card", {style: style});
            // Stripe injects an iframe into the DOM
            card.mount("#card-element");
            card.on("change", function (event) {
                // Disable the Pay button if there are no card details in the Element
                document.querySelector("button").disabled = event.empty;
                document.querySelector("#card-error").textContent = event.error
                    ? event.error.message
                    : "";
            });
            var form = document.getElementById("payment-form");
            form.addEventListener("submit", function (event) {
                event.preventDefault();
                // Complete payment when the submit button is clicked
                payWithCard(stripe, card, data.secret);
            });
        });


    // Calls stripe.confirmCardPayment
    // If the card requires authentication Stripe shows a pop-up modal to
    // prompt the user to enter authentication details without leaving your page.
    var payWithCard = function (stripe, card, clientSecret) {
        loading(true);
        stripe
            .confirmCardPayment(clientSecret, {
                payment_method: {
                    card: card,
                },
            })
            .then(function (result) {
                if (result.error) {
                    // Show error to your customer
                    showError(result.error.message);
                } else {
                    // The payment succeeded!
                    orderComplete(result.paymentIntent.id);
                }
            });
    };
    /* ------- UI helpers ------- */
    // Shows a success message when the payment is complete
    var orderComplete = function (paymentIntentId) {
        loading(false);
        // document.querySelector(".result-message a").setAttribute(
        //     "href",
        //     "https://dashboard.stripe.com/test/payments/" + paymentIntentId
        //   );
        document.querySelector(".result-message").classList.remove("hidden");
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
}

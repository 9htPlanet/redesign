//open login
const refsLogin = {
    openModalBtn: document.querySelector('[data-modal-login-open]'),
    closeModalBtn: document.querySelector('[data-modal-login-close]'),
    modal: document.querySelector('[data-modal-login]'),
};

function toggleModalLogin() {
    refsLogin.modal.classList.toggle('is-hidden');
    setTimeout(() => {
        if (!isLoginOrSignUpShown()) {
            AuthCallbacks.clearQueue();
        }
    }, 2000);
}

//open sign up
const refsSignUp = {
    openModalBtn: document.querySelector('[data-modal-sign-up-open]'),
    closeModalBtn: document.querySelector('[data-modal-sign-up-close]'),
    modal: document.querySelector('[data-modal-sign-up]'),
};

function toggleModalSignUp() {
    refsSignUp.modal.classList.toggle('is-hidden');
    setTimeout(() => {
        if (!isLoginOrSignUpShown()) {
            AuthCallbacks.clearQueue();
        }
    }, 2000);
}


//open start dream
const refsStartDream = {
    openModalBtn: document.querySelector('[data-modal-start-dream-open]'),
    closeModalBtn: document.querySelector('[data-modal-start-dream-close]'),
    modal: document.querySelector('[data-modal-start-dream]'),
};

function toggleModalStartDream() {
    ifAuth(() => refsStartDream.modal.classList.toggle('is-hidden'))
}

function isLoginOrSignUpShown() {
    return !(refsLogin.modal.classList.contains("is-hidden") && refsSignUp.modal.classList.contains("is-hidden"))
}

function isLoginOrSignUpOrForgotPasswordShown() {
    return !(refsLogin.modal.classList.contains("is-hidden")
        && refsSignUp.modal.classList.contains("is-hidden")
        && refsForgotPassword.modal.classList.contains("is-hidden"))
}


function hideAllLoginPopups() {
    if (!refsLogin.modal.classList.contains("is-hidden")) {
        toggleModalLogin();
    }
    if (!refsSignUp.modal.classList.contains("is-hidden")) {
        toggleModalSignUp();
    }
    if (!refsForgotPassword.modal.classList.contains("is-hidden")) {
        toggleModalForgotPassword();
    }

}


//Open forgot password

const refsForgotPassword = {
    openModalBtn: document.querySelector('[data-modal-forgot-password-open]'),
    closeModalBtn: document.querySelector('[data-modal-forgot-password-close]'),
    modal: document.querySelector('[data-modal-forgot-password]'),
};

function toggleModalForgotPassword() {
    refsForgotPassword.modal.classList.toggle('is-hidden');
    setTimeout(() => {
        if (!isLoginOrSignUpOrForgotPasswordShown()) {
            AuthCallbacks.clearQueue();
        }
    }, 2000);
}

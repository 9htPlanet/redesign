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

function hideAllLoginPopups() {
    if (!refsLogin.modal.classList.contains("is-hidden")) {
        toggleModalLogin()
    }
    if (!refsSignUp.modal.classList.contains("is-hidden")) {
        toggleModalSignUp()
    }
}
// const refs = {
//     openModalBtn: document.querySelector('[data-modal-open]'),
//     closeModalBtn: document.querySelector('[data-modal-close]'),
//     modal: document.querySelector('[data-modal]'),
// };
//
// refs.openModalBtn.addEventListener('click', toggleModal);
// refs.closeModalBtn.addEventListener('click', toggleModal);
//
// function toggleModal() {
//     refs.modal.classList.toggle('is-hidden');
// }


//open login
const refsLogin = {
    openModalBtn: document.querySelector('[data-modal-login-open]'),
    closeModalBtn: document.querySelector('[data-modal-login-close]'),
    modal: document.querySelector('[data-modal-login]'),
};

refsLogin.openModalBtn.addEventListener('click', toggleModalLogin);
refsLogin.closeModalBtn.addEventListener('click', toggleModalLogin);

function toggleModalLogin() {
    refsLogin.modal.classList.toggle('is-hidden');
}


//open sign up
const refsSignUp = {
    openModalBtn: document.querySelector('[data-modal-sign-up-open]'),
    closeModalBtn: document.querySelector('[data-modal-sign-up-close]'),
    modal: document.querySelector('[data-modal-sign-up]'),
};

refsSignUp.openModalBtn.addEventListener('click', toggleModalSignUp);
refsSignUp.closeModalBtn.addEventListener('click', toggleModalSignUp);

function toggleModalSignUp() {
    refsSignUp.modal.classList.toggle('is-hidden');
}


//open start dream
const refsStartDream = {
    openModalBtn: document.querySelector('[data-modal-start-dream-open]'),
    closeModalBtn: document.querySelector('[data-modal-start-dream-close]'),
    modal: document.querySelector('[data-modal-start-dream]'),
};

refsStartDream.openModalBtn.addEventListener('click', toggleModalStartDream);
refsStartDream.closeModalBtn.addEventListener('click', toggleModalStartDream);

function toggleModalStartDream() {
    ifAuth(() => refsStartDream.modal.classList.toggle('is-hidden'))
}

function isLoginOrSignUpShown() {
    return !refsLogin.modal.classList.contains("is-hidden") && !refsSignUp.modal.classList.contains("is-hidden")
}

function hideAllLoginPopups() {
    if (!refsLogin.modal.classList.contains("is-hidden")) {
        toggleModalLogin()
    }
    if (!refsSignUp.modal.classList.contains("is-hidden")) {
        toggleModalSignUp()
    }
}
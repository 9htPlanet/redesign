(() => {

    const refs = {
        openModalBtn: document.querySelector('[data-modal-open]'),
        closeModalBtn: document.querySelector('[data-modal-close]'),
        modal: document.querySelector('[data-modal]'),
    };

    refs.openModalBtn.addEventListener('click', toggleModal);
    refs.closeModalBtn.addEventListener('click', toggleModal);

    function toggleModal() {
        refs.modal.classList.toggle('is-hidden');
    }



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
})();
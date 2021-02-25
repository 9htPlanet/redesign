$('document').ready(function () {
    let fullPath = "https://api.9thplanet.ca/dreams/my";
    Dream.GetDreamByIdWithShimmer(fullPath)
});


(() => {

    //open back it
    const refsBackIt = {
        openModalBtn: document.querySelector('[data-modal-back-it-open]'),
        closeModalBtn: document.querySelector('[data-modal-back-it-close]'),
        modal: document.querySelector('[data-modal-back-it]'),
    };

    refsBackIt.openModalBtn.addEventListener('click', toggleModalBackIt);
    refsBackIt.closeModalBtn.addEventListener('click', toggleModalBackIt);

    function toggleModalBackIt() {
        refsBackIt.modal.classList.toggle('is-hidden');
    }

})();
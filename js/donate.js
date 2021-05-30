function showShimmers() {
    const tabNode = document.querySelector("#tab_investments");
    tabNode.innerHTML = `<div class="container">
                            <ul class="projects-info" id="tab_investments_content">
                                <li class="project-info-item">
                                    <div class="project-box-link" href="#" rel="noopener noreferer" target="_blank">
                                        <div class="project-img-box">
                                            <span class="shine"></span>

                                        </div>

                                        <div class="project-info-box">
                                            <h5 class="projecthead">
                                                <span class="shine h5_shine"></span>
                                            </h5>
                                            <div class="bottomline">
                                                <p class="projectdesc">
                                                    <span class="shine descr_shine"></span><br/><span
                                                        class="shine descr_shine"></span>
                                                </p>

                                                <button class="cardthumb shine"></button>
                                            </div>


                                        </div>
                                    </div>
                                </li>
                                <li class="project-info-item">
                                    <div class="project-box-link" href="#" rel="noopener noreferer" target="_blank">
                                        <div class="project-img-box">
                                            <span class="shine"></span>

                                        </div>

                                        <div class="project-info-box">
                                            <h5 class="projecthead">
                                                <span class="shine h5_shine"></span>
                                            </h5>
                                            <div class="bottomline">
                                                <p class="projectdesc">
                                                    <span class="shine descr_shine"></span><br/><span
                                                        class="shine descr_shine"></span>
                                                </p>

                                                <button class="cardthumb shine"></button>
                                            </div>


                                        </div>
                                    </div>
                                </li>
                                <li class="project-info-item">
                                    <div class="project-box-link" href="#" rel="noopener noreferer" target="_blank">
                                        <div class="project-img-box">
                                            <span class="shine"></span>

                                        </div>

                                        <div class="project-info-box">
                                            <h5 class="projecthead">
                                                <span class="shine h5_shine"></span>
                                            </h5>
                                            <div class="bottomline">
                                                <p class="projectdesc">
                                                    <span class="shine descr_shine"></span><br/><span
                                                        class="shine descr_shine"></span>
                                                </p>

                                                <button class="cardthumb shine"></button>
                                            </div>


                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>`;


    const tabNodeTracing = document.querySelector("#tab_tracing");
    tabNodeTracing.innerHTML = `<div class="container">
                            <ul class="projects-info" id="tab_tracing_content">
                                <li class="project-info-item">
                                    <div class="project-box-link" rel="noopener noreferer">
                                        <div class="project-img-box">
                                            <span class="shine"></span>

                                        </div>

                                        <div class="project-info-box">
                                            <h5 class="projecthead">
                                                <span class="shine h5_shine"></span>
                                            </h5>
                                            <div class="bottomline">
                                                <p class="projectdesc">
                                                    <span class="shine descr_shine"></span><br/><span
                                                        class="shine descr_shine"></span>
                                                </p>

                                                <button class="cardthumb shine"></button>
                                            </div>


                                        </div>
                                    </div>
                                </li>
                                <li class="project-info-item">
                                    <div class="project-box-link" href="#" rel="noopener noreferer" target="_blank">
                                        <div class="project-img-box">
                                            <span class="shine"></span>

                                        </div>

                                        <div class="project-info-box">
                                            <h5 class="projecthead">
                                                <span class="shine h5_shine"></span>
                                            </h5>
                                            <div class="bottomline">
                                                <p class="projectdesc">
                                                    <span class="shine descr_shine"></span><br/><span
                                                        class="shine descr_shine"></span>
                                                </p>

                                                <button class="cardthumb shine"></button>
                                            </div>


                                        </div>
                                    </div>
                                </li>
                                <li class="project-info-item">
                                    <div class="project-box-link" href="#" rel="noopener noreferer" target="_blank">
                                        <div class="project-img-box">
                                            <span class="shine"></span>

                                        </div>

                                        <div class="project-info-box">
                                            <h5 class="projecthead">
                                                <span class="shine h5_shine"></span>
                                            </h5>
                                            <div class="bottomline">
                                                <p class="projectdesc">
                                                    <span class="shine descr_shine"></span><br/><span
                                                        class="shine descr_shine"></span>
                                                </p>

                                                <button class="cardthumb shine"></button>
                                            </div>


                                        </div>
                                    </div>
                                </li>
                            </ul>

                        </div>`;
}

$('document').ready(function () {
    let dreamId = window.location.href.toString().split('.html?')[1];
    Dream.getDreamWithShimmerById(dreamId);

    try {
        Slider.loadSlider();
    } catch (e) {
        console.log("loadSlider error: " + e.toString())
    }

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
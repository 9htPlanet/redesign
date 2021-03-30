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

function processPage(category) {
    if (!category || category === "profile") {
        Dream.getMyDreamWithShimmer();
        Slider.loadSlider();

    } else if (category === "tracing" || category === "investments") {
        loadCards(category);
    }
}

function setupButtonsToCategory(category) {
    $(".category-button").removeClass("selected-button")
    if (!category || category === "profile") {
        $("#button_profile").toggleClass("selected-button");
    } else {
        $("#button_" + category).toggleClass("selected-button");
    }

    $(".tabs__block").hide()
    if (!category || category === "profile") {
        $("#tab_profile").show();
    } else {
        $("#tab_" + category).show();
    }
}

$('document').ready(function () {

    $(".category-button").click(function (data) {
        const category = data.target.id.split("button_").join("")
        setupButtonsToCategory(category)
        //push state
        history.pushState(null, null, "?" + category);
        processPage(category)
    })


    const category = window.location.search.split("?").join("");

    setupButtonsToCategory(category);
    processPage(category);

    window.addEventListener('popstate', (event) => {
        const category = window.location.search.split("?").join("");
        setupButtonsToCategory(category)
        processPage(category)
    });


});

function loadCards(category) {
    showShimmers();

    apiGetJson("user")
        .then(data => {
            let dataName;
            if (category === "tracing") {
                dataName = "favorites";
            } else if (category === "investments") {
                dataName = "investments";
            }

            if (data[dataName].length === 0) {
                document.querySelector(`#tab_${category}`).innerHTML = getEmptyContent(category);
            } else {
                return apiGetJsonQuery("dreams/byIds", {ids: data[dataName].join(",")});
            }
        })
        .then(data => {
            document.querySelector(`#tab_${category}_content`).innerHTML = getCardsHtmlForDreams(data);
        })
}

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

function getEmptyContent(category) {
    let emptyDescription;
    if (category === "tracing") {
        emptyDescription = "You don't follow any dreams yet 🐣";
    } else if (category === "investments") {
        emptyDescription = "You have not invested anywhere yet 🦉";
    }

    return `<div class="container"><h1 class="empty_dream_block">${emptyDescription}</h1></div>`;
}
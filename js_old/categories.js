function diffDates(day_one, day_two) {
    return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
}

function processCategory(category) {
    showShimmers()
    loadDreams(category)
}


function setupButtonsToCategory(categories) {
    $(".category-button").removeClass("selected-button")
    if (categories == null) {
        $("#btn_all").toggleClass("selected-button");
        infiniteScroll.currentCategories = null
    } else {
        const categoriesArr = categories.split(",");
        categoriesArr.forEach(function (value, index, array) {
            if (value == null || value === "all") {
                $("#btn_all").toggleClass("selected-button");
                infiniteScroll.currentCategories = null
            } else {
                $("#btn_" + value).toggleClass("selected-button");
                infiniteScroll.currentCategories = value
            }
        })
    }

    infiniteScroll.curPage = 0;
    infiniteScroll.loading = false;
    infiniteScroll.scrollFinished = false;

    if (categories == null) {
        document.title = "9th Planet — Dreams";
    } else {
        document.title = "9th Planet — " + categories.split(",").map(c => capitalizeFirstLetter(c)).join(", ");
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

$('document').ready(function () {
    initLoadCategories();

    infiniteScroll.initScroll()
    $(".category-button").click(function (data) {
        const category = data.target.id.split("btn_").join("")
        setupButtonsToCategory(category)
        //push state
        const queryParams = new URLSearchParams(window.location.search);
        queryParams.set("categories", category);
        history.pushState(null, null, "?" + queryParams.toString());
        processCategory(category)
    })

    const urlParams = new URLSearchParams(window.location.search);
    const categories = urlParams.get('categories')

    setupButtonsToCategory(categories)

    window.addEventListener('popstate', (event) => {
        console.log("location: " + document.location + ", state: " + JSON.stringify(event.state));

        const urlParams = new URLSearchParams(window.location.search);
        const categories = urlParams.get('categories')

        setupButtonsToCategory(categories)
        processCategory(categories)
    });
});

function initLoadCategories() {

    let categories = null

    const urlParams = new URLSearchParams(window.location.search);

    if (window.location.href.indexOf("categories.html") > -1) {
        categories = urlParams.get('categories');
    }
    loadDreams(categories);
}

function getEmptyContentCategory() {
    let emptyDescription = "There's nothing here yet. 🐣";
    return `<div class="container"><h1 class="empty_dream_block">${emptyDescription}</h1></div>`;
}

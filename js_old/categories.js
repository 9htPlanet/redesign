function LoadTitle(title) {
    let parent = document.getElementById('dream_container');
    let before = document.getElementById('dream_cards');
    let p = document.createElement('h3');
    p.innerHTML = title;
    parent.insertBefore(p, before);
}

function diffDates(day_one, day_two) {
    return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
}

function FindCategory(url) {

    console.log(url.indexOf('technology'));
    console.log(url.indexOf('technology') + 1);
    if (url.indexOf('technology') + 1 > 0) {
        return 'Technology';
    }
    if (url.indexOf('art') + 1 > 0) {
        return 'Art';
    }
    if (url.indexOf('music') + 1 > 0) {
        return 'Music';
    }
    if (url.indexOf('travel') + 1 > 0) {
        return 'Travel';
    }
    if (url.indexOf('entertainment') + 1 > 0) {
        return 'Entertainment';
    }
    if (url.indexOf('birthday') + 1 > 0) {
        return 'Birthday';
    }
    if (url.indexOf('hobby') + 1 > 0) {
        return 'Hobby';
    }
    if (url.indexOf('recreation') + 1 > 0) {
        return 'Recreation';
    }
    if (url.indexOf('sports') + 1 > 0) {
        return 'Sports';
    }
    if (url.indexOf('health') + 1 > 0) {
        return 'Health';
    }


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
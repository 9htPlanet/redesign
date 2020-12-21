import InfiniteAjaxScroll from "@webcreate/infinite-ajax-scroll";

function loadDreams(url) {
    let userId = window.localStorage.getItem("UserId");

    $.getJSON(url, function (data) {
        temp = '';
        let currentHref = window.location.href;
        let newData = [];
        if (currentHref.includes('index')) {
            newData = data.slice(0, 8);
            console.log(currentHref);
            console.log(newData);
        } else {
            newData = data;

            console.log(currentHref);
            console.log(newData);

        }
        for (let key in newData) { //Потом обратотать чтобы при переходе к категориям не было ограничений
            //#region Шаблон карточки с переменными
            let percent = Math.round(newData[key]['money'] * 100 / newData[key]['price'])
            let dreamName = newData[key]['name']
            let dreamDescrip = newData[key]['infoAboutDream'].slice(0, 50) + '...';
            let dayCount = diffDates(new Date(newData[key]['expirationTime']), new Date());
            if (dayCount < 0) {
                dayCount = '0';
            }
            let moneyRound = Math.round(newData[key]['money'] / 100000, 1);
            let priceRound = Math.round(newData[key]['price'] / 100000, 1);
            let dollarCurrently = (moneyRound).toString().replace('.', ',');
            let dollarNeeded = (priceRound).toString().replace('.', ',');
            let dreamLocation = newData[key]['city']['names']['en-us']
            let image = '';
            try {
                image = newData[key]['photos'][0]['sizes']['medium'];
            } catch (error) {

                image = 'img/No_image.png';
            }
            let getLike = '';
            if (newData[key]['likes'].indexOf(userId) != -1) {
                getLike = 'fas';
            } else {
                getLike = 'far';
            }

            let getDreamId = newData[key]["id"];

            let cardTemplate = '<div class="dream-card"><div class="progress progress-bar-vertical"><div class="progress-bar" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="height: ' + percent + '%;"><span class="sr-only">' + percent + '% Complete</span></div></div><div class="main_info"><a href="donate.html?' + getDreamId + '"><div class="img_card"><img src="' + image + '"alt=""></div></a><div class="detail_info"><div class="dream_title">' + dreamName + '</div><div class="dream_descrip">' + dreamDescrip + '</div><div class="dream_bottom"><div class="dream_percent">' + percent + '%</div><div class="days_people"><div class="dream_days"><span>' + dayCount + '</span> days to go</div><div class="dream_people"><span>' + dollarCurrently + 'k</span> out of <span>' + dollarNeeded + 'k</span></div></div><div class="dream_location"><i class="fas fa-map-marker-alt fa-2x" data-toggle="tooltip" data-placement="bottom" title="' + dreamLocation + '"></i></div><div class="dream_like"><input type="checkbox" class="like__input"><i id="' + getDreamId + '" class="' + getLike + ' fa-thumbs-up fa-2x like__heart"></i></div></div></div></div></div>';

            temp += cardTemplate;


            //#endregion

        }
        document.getElementById('dream_cards').innerHTML = temp;
    });

}

function nextHandler(pageIndex) {
    return fetch("./static/movies.json")
        .then((response) => response.json())
        .then((data) => {
            let frag = document.createDocumentFragment();

            let itemsPerPage = 8;
            let totalPages = Math.ceil(data.length / itemsPerPage);
            let offset = pageIndex * itemsPerPage;

            // walk over the movie items for the current page and add them to the fragment
            for (let i = offset, len = offset + itemsPerPage; i < len; i++) {
                let movie = data[i];

                let item = createMovieItem(movie);

                frag.appendChild(item);
            }

            let hasNextPage = pageIndex < totalPages - 1;

            return (
                this.append(Array.from(frag.childNodes))
                    // indicate that there is a next page to load
                    .then(() => hasNextPage)
            );
        });
}

window.ias = new InfiniteAjaxScroll(".container", {
    item: ".item",
    next: nextHandler,
    pagination: false,
});

function diffDates(day_one, day_two) {
    return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
}

function loadDreams(categories = null, page = 1) {
    infiniteScroll.loading = true

    let userId = window.localStorage.getItem("UserId");

    let queryParams = {
        page: page
    }
    if (categories != null) {
        queryParams.categories = categories;
    }

    apiGetJsonQuery("dreams", queryParams)
        .then(function (data) {
            temp = '';
            let currentHref = window.location.href;
            let newData = [];
            if (currentHref.includes('index')) {
                newData = data.slice(0, 6);
                console.log(currentHref);
                console.log(newData);
            } else {
                newData = data;

                console.log(currentHref);
                console.log(newData);

            }
            for (let key in newData) { //Потом обратотать чтобы при переходе к категориям не было ограничений
                let getDreamId = newData[key]["id"];

                //#region Шаблон карточки с переменными
                let percent = Math.round(newData[key]['money'] * 100 / newData[key]['price'])
                let dreamName = newData[key]['name']
                let dreamDescrip = newData[key]['infoAboutDream'];
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
                let onLikeClick = `Dream.addLike('${getDreamId}', this)`;
                if (newData[key]['likes'].indexOf(userId) !== -1) {
                    getLike = 'getLike';
                    onLikeClick = `Dream.removeLike('${getDreamId}', this)`;
                }

                let likesCount = newData[key].likesCount;

                let cardTemplate2 = `<li class="project-info-item" id="dream_card_${getDreamId}">
                    <div class="project-box-link" rel="noopener noreferer" href="#">
                        <a href="donate.html?${getDreamId}">
                            <div class="project-img-box">
                                <img src="${image}" alt=""/>
                                <p class="project-box-desc">${dreamDescrip}</p>
                            </div>
                            <div class="percentscale-container">
                                <span>100%</span>
                                <div class="percentscale" style="width: ${percent}%"></div>
                            </div>
                        </a>
                
                        <div class="project-info-box">
                            <h5 class="projecthead">${dreamName}</h5>
                            <div class="bottomline">
                                <p class="projectdesc"><span>${dayCount}</span> days to go <br/> <span>${dollarCurrently}k</span> out of
                                    <span>${dollarNeeded}k</span>
                                </p>
                                <button class="cardthumb ${getLike}" onclick="${onLikeClick}">
                                    <span>${likesCount}</span>
                                    <svg>
                                        <use href="./img/sprite.svg#thumbs"></use>
                                    </svg>
                                </button>
                            </div>
                
                
                        </div>
                    </div>
                </li>`

                // let cardTemplate = '<div class="dream-card"><div class="progress progress-bar-vertical"><div class="progress-bar" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="height: ' + percent + '%;"><span class="sr-only">' + percent + '% Complete</span></div></div><div class="main_info"><a href="donate.html?' + getDreamId + '"><div class="img_card"><img src="' + image + '"alt=""></div></a><div class="detail_info"><div class="dream_title">' + dreamName + '</div><div class="dream_descrip">' + dreamDescrip + '</div><div class="dream_bottom"><div class="dream_percent">' + percent + '%</div><div class="days_people"><div class="dream_days"><span>' + dayCount + '</span> days to go</div><div class="dream_people"><span>' + dollarCurrently + 'k</span> out of <span>' + dollarNeeded + 'k</span></div></div><div class="dream_location"><i class="fas fa-map-marker-alt fa-2x" data-toggle="tooltip" data-placement="bottom" title="' + dreamLocation + '"></i></div><div class="dream_like"><input type="checkbox" class="like__input"><i id="' + getDreamId + '"  title="Likes: ' + likesCount + '" class="' + getLike + ' fa-thumbs-up fa-2x like__heart"></i></div></div></div></div></div>';

                temp += cardTemplate2;

                //#endregion

            }
            if (page > 1) {
                document.getElementById('dream_cards').innerHTML += temp;
            } else {
                document.getElementById('dream_cards').innerHTML = temp;
            }

            infiniteScroll.loading = false;
            infiniteScroll.curPage++;
            if (newData.length < 20) {
                infiniteScroll.scrollFinished = true;
            }
        })

}

$('document').ready(function () {
    let categories = null

    const urlParams = new URLSearchParams(window.location.search);

    if (window.location.href.indexOf("categories.html") > -1) {
        categories = urlParams.get('categories');
    }
    loadDreams(categories);
});


function showShimmers() {
    let shimmerHtml = `<li class="project-info-item" >
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
                                    <span class="shine descr_shine"></span><br/><span class="shine descr_shine"></span>
                                </p>

                                <button class="cardthumb shine"></button>
                            </div>


                        </div>
                    </div>
                </li>`


    let html = "";
    for (i = 0; i < 20; i++) {
        html += shimmerHtml
    }

    $("#dream_cards").html(html)
    curPage = 0
}
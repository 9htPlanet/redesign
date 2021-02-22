function diffDates(day_one, day_two) {
    return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
}


$(function () {
    let token = window.localStorage.getItem("Token");
    apiGetJson("user")
        .then(function (person) {
            window.localStorage.setItem("UserId", person["id"]);

            loadDreams(person["favorites"]);


        })
        .catch(function (err) {
            console.log("err", err);
        });
});


function loadDreams(favoriteList) {
//todo: кажется, что тут происходит один вызов на каждую мечту
    temp = '';
    for (let dreamId in favoriteList) {
        let getFullPathDream = "dreams/" + favoriteList[dreamId];
        let userId = window.localStorage.getItem("UserId");
        apiGetJson(getFullPathDream)
            .then(function (newData) {
                //#region Шаблон карточки с переменными
                let percent = Math.round(newData['money'] * 100 / newData['price'])
                let dreamName = newData['name']
                let dreamDescrip = newData['infoAboutDream'].slice(0, 50) + '...';
                let dayCount = diffDates(new Date(newData['expirationTime']), new Date());
                if (dayCount < 0) {
                    dayCount = '0';
                }
                let moneyRound = Math.round(newData['money'] / 100000, 1);
                let priceRound = Math.round(newData['price'] / 100000, 1);
                let dollarCurrently = (moneyRound).toString().replace('.', ',');
                let dollarNeeded = (priceRound).toString().replace('.', ',');
                let dreamLocation = newData['city']['names']['en-us']
                let image = '';
                try {
                    image = newData['photos'][0]['sizes']['medium'];
                } catch (error) {

                    image = 'img/No_image.png';
                }
                let getLike = '';
                if (newData['likes'].indexOf(userId) != -1) {
                    getLike = 'fas';
                } else {
                    getLike = 'far';
                }

                let getDreamId = newData["id"];

                let cardTemplate = '<div class="dream-card dream_card_tracing"><div class="progress progress-bar-vertical"><div class="progress-bar" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="height: ' + percent + '%;"><span class="sr-only">' + percent + '% Complete</span></div></div><div class="main_info"><a href="donate.html?' + getDreamId + '"><div class="img_card"><img src="' + image + '"alt=""></div></a><div class="detail_info"><div class="dream_title">' + dreamName + '</div><div class="dream_descrip">' + dreamDescrip + '</div><div class="dream_bottom"><div class="dream_percent">' + percent + '%</div><div class="days_people"><div class="dream_days"><span>' + dayCount + '</span> days to go</div><div class="dream_people"><span>' + dollarCurrently + 'k</span> out of <span>' + dollarNeeded + 'k</span></div></div><div class="dream_location"><i class="fas fa-map-marker-alt fa-2x" data-toggle="tooltip" data-placement="bottom" title="' + dreamLocation + '"></i></div><div class="dream_like"><input type="checkbox" class="like__input"><i id="' + getDreamId + '" class="' + getLike + ' fa-thumbs-up fa-2x like__heart"></i></div></div></div></div></div>';

                temp += cardTemplate;

                document.getElementById('tracingIdCards').innerHTML = temp;

                //#endregion

            })
            .fail(function () {
                console.log("error");
            });


    }


}


$('document').ready(function () {

    loadDreams();

});
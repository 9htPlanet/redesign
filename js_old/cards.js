function diffDates(day_one, day_two) {
    return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
};

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
            if (newData[key]['likes'].indexOf(userId) != -1) {
                getLike = 'fas';
            } else {
                getLike = 'far';
            }

            let getDreamId = newData[key]["id"];
            let likesCount = newData[key].likesCount;
            let cardTemplate = '<li class="project-info-item">\n' +
                '                    <a class="project-box-link" target="_blank" rel="noopener noreferer" href="#">\n' +
                '                        <div class="project-img-box">\n' +
                '                                <img src="' + image + '" alt=""/>\n' +
                '                            <p class="project-box-desc">\n' + dreamDescrip +
                '                            </p>\n' +
                '                        </div>\n' +
                '                        <div class="project-info-box">\n' +
                '                            <h5 class="projecthead">' + dreamName + '</h5>\n' +
                '                            <p class="projectdesc">' + dreamDescrip + '</p>\n' +
                '                        </div>\n' +
                '                    </a>\n' +
                '                </li>'
            // let cardTemplate = '<div class="dream-card"><div class="progress progress-bar-vertical"><div class="progress-bar" role="progressbar" aria-valuenow="' + percent + '" aria-valuemin="0" aria-valuemax="100" style="height: ' + percent + '%;"><span class="sr-only">' + percent + '% Complete</span></div></div><div class="main_info"><a href="donate.html?' + getDreamId + '"><div class="img_card"><img src="' + image + '"alt=""></div></a><div class="detail_info"><div class="dream_title">' + dreamName + '</div><div class="dream_descrip">' + dreamDescrip + '</div><div class="dream_bottom"><div class="dream_percent">' + percent + '%</div><div class="days_people"><div class="dream_days"><span>' + dayCount + '</span> days to go</div><div class="dream_people"><span>' + dollarCurrently + 'k</span> out of <span>' + dollarNeeded + 'k</span></div></div><div class="dream_location"><i class="fas fa-map-marker-alt fa-2x" data-toggle="tooltip" data-placement="bottom" title="' + dreamLocation + '"></i></div><div class="dream_like"><input type="checkbox" class="like__input"><i id="' + getDreamId + '"  title="Likes: ' + likesCount + '" class="' + getLike + ' fa-thumbs-up fa-2x like__heart"></i></div></div></div></div></div>';

            temp += cardTemplate;


            //#endregion

        }
        document.getElementById('dream_cards').innerHTML = temp;
    });

}

//Вкл/выкл лайк
function ToggleLike() {
    window.onclick = function (e) {
        var elem = e ? e.target : window.event.returnValue;
        if (elem.classList.contains("like__heart")) {
            if (elem.classList.contains("far")) {
                PutLikeToDream(elem);
            }
            if (elem.classList.contains("fas")) {
                RemoveLikeToDream(elem);
            }
        }
    }
}

function PutLikeToDream(elem) {
    let token = window.localStorage.getItem("Token");
    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/dreams/" + elem.id + "/like",
        type: 'PUT',
        headers: {
            accept: "application/json",
            accessToken: token,
        },
    })
        .then(function (response) {
            console.log("Put like response", response);
            elem.classList.remove("far");
            elem.classList.add("fas");
        })
        .catch(function (err) {
            console.log("Put like error", err);
        });
};

function RemoveLikeToDream(elem) {
    let token = window.localStorage.getItem("Token");
    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/dreams/" + elem.id + "/like",
        type: 'DELETE',
        headers: {
            accept: "application/json",
            accessToken: token,
        },
    })
        .then(function (response) {
            console.log("Remove like response", response);
            elem.classList.remove("fas");
            elem.classList.add("far");

        })
        .catch(function (err) {
            console.log("Remove like error", err);
        });
};

$('document').ready(function () {

    let URL = "";
    if (window.location.href.indexOf("categories.html") > -1) {
        URL = window.location.href.toString().split('.html?')[1];
    } else if (window.location.href.indexOf("index.html") > -1) {

        URL = "https://api.9thplanet.ca/dreams";
    }
    loadDreams(URL);
    ToggleLike();
});
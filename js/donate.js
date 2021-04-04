function fillCurrentDream(data) {
    document.title = `9th Planet — ${data['name']}`
    let percent = Math.round(data['money'] * 100 / data['price'])
    let dreamDescrip = data['infoAboutDream'];
    let aboutAuthor = data['infoAboutYourself'];
    let dayCount = Dream.diffDates(new Date(data['expirationTime']), new Date());
    if (dayCount < 0) {
        dayCount = '0';
    }
    Dream.changeContentForExpiredDream(dayCount);
    let moneyRound = Math.round(data['money'] / 100000, 1);
    let priceRound = Math.round(data['price'] / 100000, 1);
    let dollarCurrently = (moneyRound).toString().replace('.', ',');
    let dollarNeeded = (priceRound).toString().replace('.', ',');
    let dreamLocation = data['city']['names']['en-us']
    let image = '';
    for (let i = 0; i < data['photos'].length; i++) {
        try {
            let img = document.createElement('img');
            img.src = data['photos'][i]['sizes']['medium'];
            document.getElementsByClassName('slider-line')[0].appendChild(img);
        } catch (error) {

            image += 'img/No_image.png';
        }

    }


    let userId = window.localStorage.getItem("UserId");
    const getDreamId = data["id"];

    let onFavoriteClick = `Dream.addToFavorites('${getDreamId}', this)`;
    let isFavorite = data['isInFavorites'];
    if (isFavorite) {
        document.getElementById('track_button').classList.toggle('getLike');
        onFavoriteClick = `Dream.removeFromFavorites('${getDreamId}', this)`;
    }


    let getLikeCount = data['likesCount'];
    let backers = data['donatesCount'];


    let onLikeClick = `Dream.addLike('${getDreamId}', this)`;
    if (data['likes'].indexOf(userId) !== -1) {
        document.getElementById('donate_like_button').classList.toggle('getLike');
        onLikeClick = `Dream.removeLike('${getDreamId}', this)`;
    }

    //#endregion

    document.getElementById('donate_dream_name').innerHTML = data['name'];
    document.getElementById('donate_dream_percent').innerHTML = percent + "%";
    document.getElementsByClassName('percentscale-donate')[0].style.width = percent + "%";

    document.getElementById('donate_dream_count_day').innerHTML = dayCount;
    document.getElementById('donate_dream_count_backer').innerHTML = backers;
    document.getElementById('donate_dream_count_money').innerHTML = dollarCurrently + "k";
    document.getElementById('donate_dream_count_price').innerHTML = dollarNeeded + "k";
    document.getElementById('donate_dream_location').innerHTML = dreamLocation;
    document.getElementById('donate_dream_like').innerHTML = getLikeCount;
    // document.getElementById('donate_dream_photo').src =image;
    // document.getElementById('donate_dream_photo-var-2_1').src = data['photos'][0]['sizes']['medium'];
    // document.getElementsByClassName('percentscale-donate-var2')[0].setAttribute("style", "height:" + percent + "%;");
    // document.getElementById('donate_dream_like').innerHTML =getLikeCount;

    document.getElementById('donate_dream_about_author').innerHTML = aboutAuthor;
    document.getElementById('donate_dream_about_dream').innerHTML = dreamDescrip;

    document.getElementById('donate_like_button').setAttribute("onclick", onLikeClick)


    document.getElementById('track_button').setAttribute("onclick", onFavoriteClick)

}

function getDreamById(dreamId) {
    let getFullPathDream = "dreams/" + dreamId;

    apiGetJson(getFullPathDream)
        .then(function (data) {
            fillCurrentDream(data)
            // let dayCount = Dream.diffDates(new Date(data['expirationTime']), new Date());
            // Dream.changeContentForExpiredDream(dayCount);

        })
        .catch(function (err) {
            console.log("GetDreamWithToken Error", err);
        });
}


$('document').ready(function () {
    let getDreamId = window.location.href.toString().split('.html?')[1];

    getDreamById(getDreamId)
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
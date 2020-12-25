function fillCurrentDream(data) {
    console.log(data)
    let percent = Math.round(data['money'] * 100 / data['price'])
    let dreamDescrip = data['infoAboutDream'];
    let aboutAuthor = data['infoAboutYourself'];
    let dayCount = Dream.diffDates(new Date(data['expirationTime']), new Date());
    if (dayCount < 0) {
        dayCount = '0';
    }
    let moneyRound = Math.round(data['money'] / 100000, 1);
    let priceRound = Math.round(data['price'] / 100000, 1);
    let dollarCurrently = (moneyRound).toString().replace('.', ',');
    let dollarNeeded = (priceRound).toString().replace('.', ',');
    let dreamLocation = data['city']['names']['en-us']
    let image = '';
    try {
        image = data['photos'][0]['sizes']['medium'];
    } catch (error) {

        image = 'img/No_image.png';
    }
    let getLike = '';
    // if (data['likes'].indexOf(userId) != -1) {
    //     getLike = 'fas';
    // } else {
    //     getLike = 'far';
    // }

    let getFavorite = '';
    let isFavorite = data['isInFavorites'];
    if (isFavorite) {
        getFavorite = 'fas';
    } else {
        getFavorite = 'far';
    }


    let getLikeCount = data['likesCount'];
    let backers = data['donatesCount'];

    //#endregion

    document.getElementById('donate_dream_name').innerHTML = data['name'];
    document.getElementById('donate_dream_percent').innerHTML = percent + "%";
    document.getElementById('donate_dream_count_day').innerHTML = dayCount;
    document.getElementById('donate_dream_count_backer').innerHTML = backers;
    document.getElementById('donate_dream_count_money').innerHTML = dollarCurrently + "k";
    document.getElementById('donate_dream_count_price').innerHTML = dollarNeeded + "k";
    document.getElementById('donate_dream_location').innerHTML =dreamLocation;
    document.getElementById('donate_dream_like').innerHTML =getLikeCount;
    document.getElementById('donate_dream_photo').src =image;
    // document.getElementById('donate_dream_like').innerHTML =getLikeCount;

    document.getElementById('donate_dream_about_author').innerHTML = aboutAuthor;
    document.getElementById('donate_dream_about_dream').innerHTML = dreamDescrip;
    // document.getElementById('donate_dream_like').classList.add(getLike);
    // document.getElementById('donate_favorite_icon').classList.add(getFavorite);
    // $('#donate_dream_progress_bar').attr('aria-valuenow', percent).css('height', percent + "%");

}

function GetDreamById(dreamId) {

    let getFullPathDream = "https://api.9thplanet.ca/dreams/" + dreamId;
    // let userId = window.localStorage.getItem("UserId");
    console.log(getFullPathDream)
    let token = window.localStorage.getItem("Token");
    let headers = {
        accept: "application/json"
    }
    if (token) {
        headers.accessToken = token
    }

    $.ajax({
        crossDomain: true,
        url: getFullPathDream,
        type: 'GET',
        headers: headers
    })
        .then(function (data) {
            fillCurrentDream(data)
        })
        .catch(function (err) {
            console.log("GetDreamWithToken Error", err);
        });
}

$('document').ready(function () {
    let getDreamId = window.location.href.toString().split('.html?')[1];

    GetDreamById(getDreamId)
});
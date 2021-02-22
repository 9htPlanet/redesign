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
    console.log(data['photos'].length)
    for (let i = 0; i < data['photos'].length; i++) {
        try {
            //image += data['photos'][0]['sizes']['medium'];
            let div = document.createElement('div');
            div.className = 'swiper-slide';
            let img = document.createElement('img');
            img.src = data['photos'][i]['sizes']['medium'];
            div.appendChild(img);
            document.getElementsByClassName('swiper-wrapper')[0].appendChild(div);
        } catch (error) {

            image += 'img/No_image.png';
        }

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
    document.getElementById('donate_dream_location').innerHTML = dreamLocation;
    document.getElementById('donate_dream_like').innerHTML = getLikeCount;
    // document.getElementById('donate_dream_photo').src =image;
    // document.getElementById('donate_dream_photo-var-2_1').src = data['photos'][0]['sizes']['medium'];
    document.getElementsByClassName('percentscale-donate-var2')[0].setAttribute("style", "height:" + percent + "%;");
    // document.getElementById('donate_dream_like').innerHTML =getLikeCount;

    document.getElementById('donate_dream_about_author').innerHTML = aboutAuthor;
    document.getElementById('donate_dream_about_dream').innerHTML = dreamDescrip;
    // document.getElementById('donate_dream_like').classList.add(getLike);
    // document.getElementById('donate_favorite_icon').classList.add(getFavorite);
    // $('#donate_dream_progress_bar').attr('aria-valuenow', percent).css('height', percent + "%");
    let swiper = new Swiper('.swiper-container', {
        spaceBetween: 10,
        effect: 'fade',
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    });
}

function GetDreamById(dreamId) {

    let getFullPathDream = "dreams/" + dreamId;
    console.log(getFullPathDream)

    apiGetJson(getFullPathDream)
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
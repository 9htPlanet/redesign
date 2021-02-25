class Dream {
    static diffDates(day_one, day_two) {
        return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
    }

    static putLikeToDream(dreamId, elem) {
        apiPutJson("dreams/" + dreamId + "/like")
            .then(function (response) {
                console.log("Put like response", response);
                elem.classList.remove("far");
                elem.classList.add("fas");
            })
            .catch(function (err) {
                console.log("Put like error", err);
            });
    }

    static RemoveLikeToDream(dreamId, elem) {
        apiDelete(`dreams/${dreamId}/like`)
            .then(function (response) {
                console.log("Remove like response", response);
                elem.classList.remove("fas");
                elem.classList.add("far");

            })
            .catch(function (err) {
                console.log("Remove like error", err);
            });
    }

    static PutFavoriteToDream(dreamId, elem) {
        apiPost(`user/favorites/${dreamId}`)
            .then(function (response) {
                console.log("Put favorite response", response);
                elem.classList.remove("far");
                elem.classList.add("fas");
            })
            .catch(function (err) {
                console.log("Put favorite error", err);
            });
    }

    static RemoveFavoriteToDream(dreamId, elem) {
        apiDelete(`user/favorites/${dreamId}`,)
            .then(function (response) {
                console.log("Remove favorite response", response);
                elem.classList.remove("fas");
                elem.classList.add("far");

            })
            .catch(function (err) {
                console.log("Remove favorite error", err);
            });
    }

    static fillCurrentDream(dataList) {
        let data = dataList[1];
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

    static fillCurrentDreamWithShimmer(dataList) {
        let data = dataList[1];
        let percent = Math.round(data['money'] * 100 / data['price'])

        //Доллары
        let moneyRound = Math.round(data['money'] / 100000, 1);
        let priceRound = Math.round(data['price'] / 100000, 1);
        let dollarCurrently = (moneyRound).toString().replace('.', ',');
        let dollarNeeded = (priceRound).toString().replace('.', ',');
        let dollarCurrentlyHTML = `<span>${dollarCurrently}k
                                   </span> out of <span>${dollarNeeded}k</span>`
        document.getElementById('donate_dream_count_money').innerHTML = dollarCurrentlyHTML;

        //Остаток дней
        let dayCount = Dream.diffDates(new Date(data['expirationTime']), new Date());
        if (dayCount < 0) {
            dayCount = '0';
        }
        let daysHTML = `<span>${dayCount}</span> days to go`
        document.getElementById('donate_dream_count_day').innerHTML = daysHTML;

        //Количество пожертвовавших
        let backers = data['donatesCount'];
        let backersHTML = `<span>${backers}</span> backers`
        document.getElementById('donate_dream_count_backer').innerHTML = backersHTML;

        //Локация
        let dreamLocation = data['city']['names']['en-us']
        let locationHTML = `<svg class="footer-social-icons-svg">
                                <use href="./images/sprite.svg#location"></use>
                            </svg>
                            <span>${dreamLocation}</span>`

        document.getElementById('donate_dream_location').innerHTML = locationHTML;

        let getLikeCount = data['likesCount'];
        let likesHTML = `<div class="like-it">
                            <svg class="footer-social-icons-svg">
                                <use href="./img/sprite.svg#thumbs"></use>
                            </svg>
                            <span>${getLikeCount} Like It</span>
                         </div>

                        <div class="track-it">
                            <svg class="footer-social-icons-svg">
                                <use href="./images/sprite.svg#trackIt"></use>
                            </svg>
                            <span>Track It</span>

                        </div>`
        document.getElementById('donate_dream_like').innerHTML = likesHTML;


        //Имя мечты
        document.getElementById('donate_dream_name').innerHTML = data['name'];
        //Процент мечты
        document.getElementById('donate_dream_percent').innerHTML = percent + "%";

        //Подгрузка кнопки и значков соц сетей
        document.getElementById('backIt_id').classList.remove("shine");

        let iconsHTML = `<li class="footer-social-icons-item">
                                <a
                                        class="footer-social-icons-link"
                                        href="https://twitter.com/"
                                        target="_blank"
                                        rel="noopener noreferer"
                                        aria-label="Twitter"
                                >
                                    <svg class="footer-social-icons-svg">
                                        <use href="./images/sprite.svg#twitter"></use>
                                    </svg>
                                </a>
                            </li>
                            <li class="footer-social-icons-item">
                                <a
                                        class="footer-social-icons-link"
                                        href="https://facebook.com/"
                                        target="_blank"
                                        rel="noopener noreferer"
                                        aria-label="Facebook"
                                >
                                    <svg class="footer-social-icons-svg">
                                        <use href="./images/sprite.svg#facebook"></use>
                                    </svg>
                                </a>
                            </li>`
        document.getElementById('social_icons_id').innerHTML = iconsHTML;


        //Подгрузка информации о пользователе
        let dreamDescrip = data['infoAboutDream'];
        let aboutAuthor = data['infoAboutYourself'];

        document.getElementById('aboutYourself_id').innerHTML = "About author";
        document.getElementById('donate_dream_about_author').innerHTML = aboutAuthor;
        document.getElementById('aboutDream_id').innerHTML = "Dream information";
        document.getElementById('donate_dream_about_dream').innerHTML = dreamDescrip;


        //Загрузка изображений
        let teplateForImg = `
                         <div class="swiper-container">
                            <div class="swiper-wrapper">

                            </div>
                            <!-- Add Pagination -->
                            <div class="swiper-pagination"></div>
                            <!-- Add Arrows -->
                            <div class="swiper-button-next"></div>
                            <div class="swiper-button-prev"></div>
                        </div>


                        <div class="percentscale-container-donate-var2">
                            <div class="percentscale-donate-var2"></div>
                        </div>`
        let image = '';

        document.getElementById('donate_img_id').innerHTML = teplateForImg;
        document.getElementsByClassName('percentscale-donate-var2')[0].setAttribute("style", "height:" + percent + "%;");

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

    static GetDreamByIdWithShimmer(fullPathDream) {

        let token = window.localStorage.getItem("Token");
        let headers = {
            accept: "application/json"
        }
        if (token) {
            headers.accessToken = token
        }

        $.ajax({
            crossDomain: true,
            url: fullPathDream,
            type: 'GET',
            headers: headers
        })
            .then(function (data) {
                Dream.fillCurrentDreamWithShimmer(data)
            })
            .catch(function (err) {
                console.log("GetDreamWithToken Error", err);
            });
    }


    static GetDreamById(fullPathDream) {

        let token = window.localStorage.getItem("Token");
        let headers = {
            accept: "application/json"
        }
        if (token) {
            headers.accessToken = token
        }

        $.ajax({
            crossDomain: true,
            url: fullPathDream,
            type: 'GET',
            headers: headers
        })
            .then(function (data) {
                Dream.fillCurrentDream(data)
            })
            .catch(function (err) {
                console.log("GetDreamWithToken Error", err);
            });
    }


}
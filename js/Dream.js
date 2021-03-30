class Dream {
    static diffDates(day_one, day_two) {
        return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
    }

    static addLike(dreamId, elem) {
        ifAuth(() => {
            elem.disabled = true
            elem.querySelector('span').innerHTML = parseInt(elem.querySelector('span').innerHTML) + 1;
            elem.classList.toggle('getLike');
            apiPutJson("dreams/" + dreamId + "/like")
                .then(function (response) {
                    elem.disabled = false;
                    let newLikesCount = response.likesCount;
                    if (newLikesCount >= 0) {
                        elem.querySelector('span').innerHTML = newLikesCount;
                        elem.setAttribute("onclick", `Dream.removeLike('${response.id}', this)`);
                    } else {
                        elem.classList.toggle('getLike');
                        elem.querySelector('span').innerHTML = parseInt(elem.querySelector('span').innerHTML) - 1;
                    }
                })
                .catch(function (err) {
                    elem.classList.toggle('getLike');
                    elem.querySelector('span').innerHTML = parseInt(elem.querySelector('span').innerHTML) - 1;
                    elem.disabled = false
                    console.log("Put like error", err);
                });
        })
    }

    static removeLike(dreamId, elem) {
        ifAuth(() => {
            elem.disabled = true
            elem.querySelector('span').innerHTML = parseInt(elem.querySelector('span').innerHTML) - 1;
            elem.classList.toggle('getLike');
            apiDeleteJson("dreams/" + dreamId + "/like")
                .then(function (response) {
                    elem.disabled = false;
                    let newLikesCount = response.likesCount;
                    if (newLikesCount >= 0) {
                        elem.querySelector('span').innerHTML = newLikesCount;
                        elem.setAttribute("onclick", `Dream.addLike('${response.id}', this)`);
                    } else {
                        elem.classList.toggle('getLike');
                    }
                })
                .catch(function (err) {
                    elem.classList.toggle('getLike');
                    elem.querySelector('span').innerHTML = parseInt(elem.querySelector('span').innerHTML) + 1;
                    elem.disabled = false;
                    console.log("Remove like error", err);
                });
        })
    }

    static addToFavorites(dreamId, elem) {
        ifAuth(() => {
            elem.disabled = true
            elem.classList.toggle('getLike');
            apiPostJson(`user/favorites/${dreamId}`)
                .then(function (response) {
                    elem.disabled = false;
                    if (response.id) {
                        elem.setAttribute("onclick", `Dream.removeFromFavorites('${dreamId}', this)`);
                    } else {
                        elem.classList.toggle('getLike');
                    }
                })
                .catch(function (err) {
                    elem.classList.toggle('getLike');
                    elem.disabled = false
                });
        })
    }

    static removeFromFavorites(dreamId, elem) {
        ifAuth(() => {
            elem.disabled = true
            elem.classList.toggle('getLike');
            apiDeleteJson(`user/favorites/${dreamId}`)
                .then(function (response) {
                    elem.disabled = false;
                    if (response.id) {
                        elem.setAttribute("onclick", `Dream.addToFavorites('${dreamId}', this)`);
                    } else {
                        elem.classList.toggle('getLike');
                    }
                })
                .catch(function (err) {
                    elem.classList.toggle('getLike');
                    elem.disabled = false
                });
        })
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
        document.getElementsByClassName('percentscale-donate')[0].setAttribute("style", "height:" + percent + "%;");
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

    static fillCurrentDreamWithShimmer(dataSrc) {
        let data = "";
        if (Array.isArray(dataSrc)) {
            data = dataSrc[dataSrc.length - 1]
        } else {
            data = dataSrc;
        }
        let percent = Math.round(data['money'] * 100 / data['price'])

        //Доллары
        let moneyRound = Math.round(data['money'] / 100, 1);
        let priceRound = Math.round(data['price'] / 100, 1);
        console.log(data)
        console.log(moneyRound)
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

        Dream.changeContentForExpiredDream(dayCount);

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

        let userId = window.localStorage.getItem("UserId");
        const getDreamId = data["id"];

        let getLike = '';
        let onLikeClick = `Dream.addLike('${getDreamId}', this)`;
        if (data['likes'].indexOf(userId) !== -1) {
            getLike = 'getLike';
            onLikeClick = `Dream.removeLike('${getDreamId}', this)`;
        }

        let getFavorite = '';
        let onFavoriteClick = `Dream.addToFavorites('${getDreamId}', this)`;
        let isFavorite = data['isInFavorites'];
        if (isFavorite) {
            getFavorite = 'getLike';
            onFavoriteClick = `Dream.removeFromFavorites('${getDreamId}', this)`;
        }

        let likesHTML = `<a class="like-it ${getLike}" onclick="${onLikeClick}">
                            <svg class="footer-social-icons-svg">
                                <use href="./img/sprite.svg#thumbs"></use>
                            </svg>
                            <span>${getLikeCount}</span> Like It
                         </a>

                        <a class="track-it ${getFavorite}" onclick="${onFavoriteClick}">
                            <svg class="footer-social-icons-svg">
                                <use href="./images/sprite.svg#trackIt"></use>
                            </svg>
                            <span>Track It</span>
                        </a>`
        document.getElementById('donate_dream_like').innerHTML = likesHTML;


        //Имя мечты
        document.getElementById('donate_dream_name').innerHTML = data['name'];
        //Процент мечты
        document.getElementsByClassName('percentscale-donate')[0].style.width = percent + "%";
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
        document.getElementById('donate_dream_percent').innerHTML = percent + "%";


        let teplateForImg = `
                         <div class="slider">
                            <div class="slider-line"></div>
                        </div>
                        <div class="slider-prev"></div>
                        <div class="slider-next"></div>`

        document.getElementById('donate_img_id').innerHTML = teplateForImg;
        let getPercentScale = document.getElementsByClassName('percentscale-container-donate')[0];
        if (getPercentScale.classList.contains('hidden')) {
            getPercentScale.classList.remove('hidden');
        }


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
    }

    static getMyDreamWithShimmer() {
        apiGetJson("dreams/my")
            .then(function (data) {
                Dream.fillCurrentDreamWithShimmer(data);
                Slider.loadSlider();

            })
            .catch(function (err) {
                console.log("GetDreamWithToken Error", err);
            });
    }


    static changeContentForExpiredDream(dreamStatus) {
        if (dreamStatus <= 0) {
            document.getElementById("paymentForm_id").innerHTML = "Sorry, this dream is expired. Select another dream."
        }
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
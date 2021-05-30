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

    static fillCurrentDreamWithShimmer(dataSrc) {
        let data = "";
        if (Array.isArray(dataSrc)) {
            data = dataSrc[dataSrc.length - 1]
        } else {
            data = dataSrc;
        }

        if (!data) {
            document.querySelector(`#tab_profile`).innerHTML = getEmptyContent("")
            return
        }

        let percent = Math.round(data['money'] * 100 / data['price']);

        //Доллары
        let moneyRound = Math.round(data['money'] / 100, 1);
        let priceRound = Math.round(data['price'] / 100, 1);
        console.log(data)
        console.log(moneyRound)
        let dollarCurrently = (moneyRound).toString().replace('.', ',');
        let dollarNeeded = (priceRound).toString().replace('.', ',');
        let dollarCurrentlyHTML = `<span>${dollarCurrently}
                                   </span> out of <span>${dollarNeeded}</span>`
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

        let likesHTML = `<button class="like-it ${getLike}" onclick="${onLikeClick}">
                            <svg class="footer-social-icons-svg">
                                <use href="./img/sprite.svg#thumbs"></use>
                            </svg>
                            <span>${getLikeCount}</span> Like It
                         </button>

                        <button class="track-it ${getFavorite}" onclick="${onFavoriteClick}">
                            <svg class="footer-social-icons-svg">
                                <use href="./images/sprite.svg#trackIt"></use>
                            </svg>
                            <span>Track It</span>
                        </button>`
        document.getElementById('donate_dream_like').innerHTML = likesHTML;


        //Имя мечты
        document.getElementById('donate_dream_name').innerHTML = data['name'];
        //Заголовок страницы
        document.getElementById("dream_title_id").innerText = "9tPlanet — " + data['name'];

        //Процент мечты
        document.getElementsByClassName('percentscale-donate')[0].style.width = percent + "%";
        //Подгрузка кнопки и значков соц сетей
        document.getElementById('backIt_id').classList.remove("shine");

        const dreamLink = "https://9thplanet.ca/donate.html?" + location.search;
        const shareText = encodeURIComponent("Donate this dream: " + dreamLink);

        let iconsHTML = `<li class="footer-social-icons-item">
                                <a
                                        class="footer-social-icons-link"
                                        href="https://twitter.com/intent/tweet?text=${shareText}"
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
                                        href="https://www.facebook.com/sharer.php?u=${dreamLink}"
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


        document.getElementById('donate_img_id').innerHTML = `
                         <div class="slider img_static_container">
                            <div class="slider-line"></div>
                        </div>
                        <div class="slider-prev"></div>
                        <div class="slider-next"></div>`;


        let image = '';
        let imageInterval;


        if (!data || !data["photos"] || data['photos'].length === 0) {
            data = {
                photos: [
                    {
                        sizes: {
                            medium: 'img/No_image.svg'
                        }
                    }
                ]
            }
        }

        for (let i = 0; i < data['photos'].length; i++) {
            try {

                let img = document.createElement('img');
                img.src = data['photos'][i]['sizes']['medium'];
                img.classList.add("slider_img")

                let container = document.createElement('div');
                container.classList.add("img_static_container")
                container.appendChild(img)

                document.getElementsByClassName('slider-line')[0].appendChild(container);
            } catch (error) {

                image += 'img/No_image.svg';
            }

        }


        let getPercentScale = document.getElementsByClassName('percentscale-container-donate')[0];
        let imgShimmer = document.getElementById('donate_img_shimmer');
        let imgLoader = document.getElementById('donate_img_id');
        let images = document.querySelectorAll('#donate_img_id img');

        imageInterval = setInterval(() => {
            if (images[0].complete) {
                clearInterval(imageInterval);
                if (getPercentScale.classList.contains('hidden')) {
                    getPercentScale.classList.remove('hidden');
                }
                if (!imgShimmer.classList.contains('hidden')) {
                    imgShimmer.classList.add('hidden');
                }
                if (imgLoader.classList.contains('hidden')) {
                    imgLoader.classList.remove('hidden');
                }

            }
        }, 50);

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

    static getDreamWithShimmerById(id) {
        let getFullPathDream = "dreams/" + id;
        apiGetJson(getFullPathDream)
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

}

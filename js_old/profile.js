document.addEventListener("DOMContentLoaded", function () {
    function loadProfile() {
        $.getJSON("https://api.9thplanet.ca/dreams", function (data) {
            temp = "";
            for (let key in data.slice(0, 8)) {
                //#region Шаблон карточки с переменными

                let percent = Math.round(
                    (data[key]["money"] * 100) / data[key]["price"]
                );
                let dreamName = "Dream#10";
                let dreamDescrip = data[key]["infoAboutDream"].slice(0, 50) + "...";
                let image = data[key]["photos"][0]["sizes"]["medium"];
                let dayCount = diffDates(
                    new Date(data[key]["expirationTime"]),
                    new Date(data[key]["created"])
                );
                let moneyRound = Math.round(data[key]["money"] / 100000, 1);
                let priceRound = Math.round(data[key]["price"] / 100000, 1);
                let dollarCurrently = moneyRound.toString().replace(".", ",");
                let dollarNeeded = priceRound.toString().replace(".", ",");
                let dreamLocation = data[key]["city"]["names"]["en-us"];

                let dreamId = data[key]["id"];
                let cardTemplate =
                    '<div class="dream-card"><div class="progress progress-bar-vertical"><div class="progress-bar" role="progressbar" aria-valuenow="' +
                    percent +
                    '" aria-valuemin="0" aria-valuemax="100" style="height: ' +
                    percent +
                    '%;"><span class="sr-only">' +
                    percent +
                    '% Complete</span></div></div><div class="main_info"><a href="donate.html?' +
                    dreamId +
                    '"><div class="img_card"><img src="' +
                    image +
                    '"alt=""></div></a><div class="detail_info"><div class="dream_title">' +
                    dreamName +
                    '</div><div class="dream_descrip">' +
                    dreamDescrip +
                    '</div><div class="dream_bottom"><div class="dream_percent">' +
                    percent +
                    '%</div><div class="days_people"><div class="dream_days"><span>' +
                    dayCount +
                    '</span> days to go</div><div class="dream_people"><span>' +
                    dollarCurrently +
                    "k</span> out of <span>" +
                    dollarNeeded +
                    'k</span></div></div><div class="dream_location"><i class="fas fa-map-marker-alt fa-2x" data-toggle="tooltip" data-placement="bottom" title="' +
                    dreamLocation +
                    '"></i></div><div class="dream_like"><input type="checkbox" class="like__input"><i class="far fa-thumbs-up fa-2x like__heart"></i></div></div></div></div></div>';

                //#endregion

                temp += cardTemplate;
            }
            document.getElementById("dream_cards").innerHTML = temp;
        });
    }

    //Обновить данные логина  в header-е
    function updateLoginDataInHeader() {
        let token = window.localStorage.getItem("Token");
        let userName = window.localStorage.getItem("UserName");

        if (token != null && userName != null) {
            $("#profile-name").remove();
            $("#logoutid").remove();


            const dropDown = `<li class="item" id="profile-name">
									<a href="profile.html" class="upper-contacts-item">
										${userName}
									</a>
								</li>
								<li class="item" id="logoutid">
									<button class="upper-contacts-item" title="Log out">
										<svg class="upper-contacts-svg-two upper-contacts-svg">
											<use href="./images/sprite.svg#exit"></use>
										</svg>
									</button>
								</li>
								`;

            //$("#headerSectionRight").append(dropDown);

            const op = document.getElementById("header-right-buttons");
            op.innerHTML = dropDown;

            onLogoutClickSetup()
        }
    }

    //Показать имя пользователя и кнопку Log out, если пользователь авторизирован
    $(function () {
        updateLoginDataInHeader()
    })

    // Получить имя пользователя и вывести это в шапке
    $(function () {
        let token = window.localStorage.getItem("Token");
        if (token == null) {
            return
        }
        $.ajax({
            crossDomain: true,
            url: "https://api.9thplanet.ca/user",
            headers: {
                accept: "application/json",
                accessToken: token,
            },
        })
            .then(function (response) {
                let stringified = JSON.stringify(response);
                var person = JSON.parse(stringified);
                const userName = person["firstName"] + ' ' + person["lastName"]

                console.log(person);
                window.localStorage.setItem("UserId", person["id"]);
                window.localStorage.setItem("UserName", userName);

                updateLoginDataInHeader()
            })
            .catch(function (err) {
                console.log("err", err);
            });
    });

    //отображение мечты текущего пользователя в профиле
    $(function () {
        let token = window.localStorage.getItem("Token");

        let cardTemplte = `
	<div class="col-3 col_style_acc">
	<div class="container">
		<div class="row">
			<div class="dream-card per-acc-card">
				<div class="main_info">
					<a id = "hrefId" href="donate.html?">
		
						<div class="img_card">
							<img id="profileDreamPhotoId" src="" alt="">
						</div>
					</a>
					<div class="detail_info detail_info_override">
						<div id="profileDreamName" class="dream_title"></div>
						<div id="profileDreamDescription" class="dream_descrip"></div>
		
					</div>
		
				</div>
				<div class="progress progress-bar-vertical">
					<div id="profileDreamPercentProgressBar" class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="height: 90%;">
					</div>
				</div>
		
			</div>

		</div>
		<div class="row">
			<div  class="headerButton">
				<a href="edit_dream.html" id="editYourDream" class="btn btn-light btn_sign_up_override btn_go_position btn_reset_alignment">Edit Dream</a>
			</div>

		</div>
	</div>
	
</div>
<div class="col-1 dream_percent_acc"><span id="profileDreamPercent"></span>%</div>
<div class="col-8">
	<div class="container">
		<div class="row">
			<div class="col">
				<div class="header_about_dream">
					About dream
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col about_text_style">
				<div class="description_about_dream">
					<div class="days_people override_days_people">
						<div class="dream_days">
							<span id="profileCountDays"></span> days to go
						</div>
					</div>
					<div class="days_people override_days_people">
						<div class="dream_days">
							<span id="profileCountMoney"></span> money to go
						</div>
					</div>
					<div class="days_people override_days_people">
						<div class="dream_days">
							<span id="profileBackersId"></span> backers
						</div>
					</div>


					<a href="" class="facebook_acc">
						<i class="fab fa-facebook fb_style"></i>
					</a>
					<a href="" class="facebook_acc">
						<i class="fab fa-twitter tw_style"></i>
					</a>


				</div>
			</div>
		</div>

		<div class="row">
			<div class="col">
				<div class="header_about_dream">
					<h3>Reviews</h3>
				</div>
				<div class="description_about_dream override_description_about_dream">
					<div class="reviews-description">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Itaque dicta vitae maxime asperiores saepe delectus. Non, accusantium repellendus quaerat quis, sit sequi minus a aliquam nesciunt totam consequuntur, consectetur assumenda.Rerum
						eaque minus voluptatem fugiat animi, odio dolore, dignissimos debitis labore veniam maxime quas. Est recusandae debitis quidem velit aliquam ad reprehenderit quo, natus, quaerat, ut tempore cumque praesentium hic.</div>

				</div>
			</div>
		</div>

	</div>
</div>

	`;

        $.ajax({
            crossDomain: true,
            url: "https://api.9thplanet.ca/dreams/my",
            headers: {
                accept: "application/json",
                accessToken: token,
            },
        })
            .then(function (response) {
                $("document").ready(function () {
                    let stringified = JSON.stringify(response);
                    var userDream = JSON.parse(stringified);
                    console.log(userDream);
                    if (userDream.length > 0) {
                        let profileInsertDream = document.getElementById(
                            "profileInsertDream"
                        );
                        profileInsertDream.innerHTML = cardTemplte;

                        let getHrefId = document.getElementById("hrefId");
                        getHrefId.href = "donate.html?" + userDream["0"]["id"]
                        let dayCount = diffDates(
                            new Date(userDream["0"]["expirationTime"]),
                            new Date(userDream["0"]["created"])
                        );

                        let dreamName = document.getElementById("profileDreamName");
                        dreamName.innerHTML = userDream["0"]["name"];

                        let getIdDayCount = document.getElementById("profileCountDays");
                        getIdDayCount.innerHTML = dayCount;

                        let getIdDreamDescrip = document.getElementById(
                            "profileDreamDescription"
                        );
                        getIdDreamDescrip.innerHTML = userDream["0"]["infoAboutDream"];

                        let moneyRound = Math.round(userDream["0"]["money"] / 100000, 1);
                        let dollarCurrently = moneyRound.toString().replace(".", ",");
                        let getIdDreamCountMoney = document.getElementById(
                            "profileCountMoney"
                        );
                        getIdDreamCountMoney.innerHTML = dollarCurrently;

                        let dreamPercent = Math.round(
                            (userDream["0"]["money"] * 100) / userDream["0"]["price"]
                        );
                        let getIdDreamPercent = document.getElementById(
                            "profileDreamPercent"
                        );
                        getIdDreamPercent.innerHTML = dreamPercent;

                        let getBackersId = document.getElementById("profileBackersId");
                        getBackersId.innerHTML = userDream["0"]["donatesCount"];

                        let firstPhoto = document.getElementById("profileDreamPhotoId");
                        firstPhoto.src = userDream["0"]["photos"]["0"]["sizes"]["small"];

                        let getIdDreamPercentProgressBar = document.getElementById(
                            "profileDreamPercentProgressBar"
                        );
                        getIdDreamPercentProgressBar.setAttribute(
                            "aria-valuenow",
                            dreamPercent
                        );
                        getIdDreamPercentProgressBar.style.height = dreamPercent + "%";
                    } else {
                        let startBtn =
                            '<div class="container-fluid"><div class="row"><div class="col text_style_profile"><h3>You haven\'t got a dream yet</h3></div></div></div><div class="container-fluid"><div class="row"><div class="col col_style_acc col_style_acc_button"><div id="headerButtonId" class="headerButton"><a class="btn btn-light btn_start_dream_override font-weight-bold" href="start_dream.html">Start Dream</a></div></div></div></div>';
                        let profileInsertDream = document.getElementById(
                            "profileInsertDream"
                        );
                        console.log(profileInsertDream);
                        profileInsertDream.innerHTML = startBtn;
                    }
                });
            })
            .catch(function (err) {
                let startBtn =
                    '<div class="container-fluid"><div class="row"><div class="col text_style_profile"><h3>You haven\'t got a dream yet</h3></div></div></div><div class="container-fluid"><div class="row"><div class="col col_style_acc col_style_acc_button"><div id="headerButtonId" class="headerButton"><a class="btn btn-light btn_start_dream_override font-weight-bold" href="start_dream.html">Start Dream</a></div></div></div></div>';
                let profileInsertDream = document.getElementById("profileInsertDream");
                profileInsertDream.innerHTML = startBtn;
                console.log("err", err);
            });

        function diffDates(day_one, day_two) {
            return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
        }
    });

    function onLogoutClickSetup() {
        let logout = document.getElementById("logoutid");
        logout.onclick = function () {
            let token = window.localStorage.getItem("Token");

            window.localStorage.removeItem("Token");
            window.localStorage.removeItem("UserId");

            $.ajax({
                crossDomain: true,
                url: "https://api.9thplanet.ca/auth",
                type: "DELETE",
                headers: {
                    accept: "application/json",
                    accessToken: token,
                },
            })
                .then(function (response) {
                    window.localStorage.removeItem("Token");
                    window.localStorage.removeItem("UserId");
                    document.location.href = "index.html";
                    /*$("#profile-name").remove();
                    $("#logoutid").remove();

                    let loginButtons  = '<li class="item" id="loginId">\n' +
                        '                <button class="upper-contacts-item" data-modal-login-open>\n' +
                        '                    Log In\n' +
                        '                </button>\n' +
                        '            </li>\n' +
                        '            <li class="item" id="signUpId">\n' +
                        '                <button class="upper-contacts-item" data-modal-login-open>\n' +
                        '                    Sign Up\n' +
                        '                </button>\n' +
                        '            </li>'

                    const op = document.getElementById("header-right-buttons");
                    op.innerHTML = loginButtons;*/

                    console.log("Success: ", response);
                })
                .catch(function (err) {
                    console.log("Error: ", err);
                });
        };
    }

    // My investment
    function BigCard() {
        const bigCardHtml = `<div class="dream-card per-acc-card">
                      <div class="main_info">
                          <a href="">
                              <div class="img_card">
                                  <img src="https://media1.popsugar-assets.com/files/thumbor/NiU8Gj-i_HbjlfUgXrRK_jW3MeM/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2018/01/10/765/n/43463692/12a22f695a564bb32c3379.99027066_edit_img_image_44490285_1515603002/i/PicsArt-POPSUGAR-Travel-Challenge-Winners.jpg"
                                      alt="">
                              </div>
                          </a>
                          <div class="detail_info">
                              <div class="dream_title">
                                  DREAM#1
                              </div>
                              <div class="dream_descrip">
                                  Lorem ipsum dolor sit amet consectetur adipisicing...
                              </div>

                          </div>

                      </div>
                      <div class="progress progress-bar-vertical">
                          <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="height: 90%;">
                              <span class="sr-only">90% Complete</span>
                          </div>
                      </div>
                  </div>`;

        document.getElementById("myInvestmentBigCard").innerHTML = bigCardHtml;
    }

    function LoadSmallDreams(params) {
        let temp = "";
        for (let index = 0; index < 3; index++) {
            let smallCard = `<div class="mini-card per-acc-card">
            <div class="main_info">
                <a href="">
                    <div class="img_card_mini">
                        <img src="https://media1.popsugar-assets.com/files/thumbor/NiU8Gj-i_HbjlfUgXrRK_jW3MeM/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2018/01/10/765/n/43463692/12a22f695a564bb32c3379.99027066_edit_img_image_44490285_1515603002/i/PicsArt-POPSUGAR-Travel-Challenge-Winners.jpg"
                            alt="">
                    </div>
                </a>
                <div class="detail_info_mini">
                    <div class="row">
                        <div class="col-7">
                            <div class="dream_title_mini">
                                DREAM#1
                            </div>
                        </div>
                        <div class="col">
                            <div class="dream_title_mini">
                                10%
                            </div>
                        </div>
                    </div>
                </div>
            </div>    
            <div class="progress progress-bar-vertical">
                <div class="progress-bar" role="progressbar" aria-valuenow="90" aria-valuemin="0" aria-valuemax="100" style="height: 90%;">
                    <span class="sr-only">90% Complete</span>
                </div>
            </div>
        </div>`;
            temp += smallCard;
        }
        document.getElementById("myInvestmentSmallCard").innerHTML = temp;
    }

    $("document").ready(function () {
        let per = window.location.href.toString().split(".html?")[0];
        if (per.includes("my_investments")) {
            BigCard();
            LoadSmallDreams();
        }
    });
});

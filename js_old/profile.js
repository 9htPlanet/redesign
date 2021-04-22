function updateCurrentUserInfo() {
    apiGetJson("user")
        .then(function (person) {
            const userName = person["firstName"] + ' ' + person["lastName"]

            console.log(person);
            window.localStorage.setItem("UserId", person["id"]);
            window.localStorage.setItem("UserName", userName);

            updateLoginDataInHeader()
            if (!person.isEmailConfirmed) {
                document.querySelector(".top_email").classList.remove("hidden")
            }
        })
        .catch(function (err) {
            console.log("err", err);
        });
}

//Обновить данные логина  в header-е
function updateLoginDataInHeader() {
    let token = window.localStorage.getItem("Token");
    let userName = window.localStorage.getItem("UserName");

    if (token != null && userName != null) {
        document.querySelectorAll(".profile-link").forEach(it => it.style.display = "block");
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
        onLogoutClickSetup();
    } else {
        document.querySelectorAll(".profile-link").forEach(it => it.style.display = "none");
        const noLogin =
            `<li class="item" id="loginId">
                <button class="upper-contacts-item" onclick="toggleModalLogin()">
                    Log In
                </button>
            </li>
            <li class="item" id="signUpId">
                <button class="upper-contacts-item" onclick="toggleModalSignUp()">
                    Sign Up
                </button>
            </li>
                    `;
        const op = document.getElementById("header-right-buttons");
        op.innerHTML = noLogin;
    }
}

function onLogoutClickSetup() {
    let logout = document.getElementById("logoutid");
    logout.onclick = function () {

        window.localStorage.removeItem("Token");
        window.localStorage.removeItem("UserId");

        apiDeleteJson("auth")
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

document.addEventListener("DOMContentLoaded", function () {
    function loadProfile() {
        apiGetJson("dreams")
            .then(function (data) {
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
            })
    }


    //Показать имя пользователя и кнопку Log out, если пользователь авторизирован
    $(function () {
        updateLoginDataInHeader()
    })

    // Получить имя пользователя и вывести это в шапке
    $(function () {
        updateCurrentUserInfo(updateLoginDataInHeader);
    });

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

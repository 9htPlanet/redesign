
$(document).ready(function() {
    // $(function() {
    //     $("#header").load("header.html");
    // });

    $("#menu").on("click", "a", function(event) {
        //отменяем стандартную обработку нажатия по ссылке
        event.preventDefault();

        //забираем идентификатор бока с атрибута href
        var id = $(this).attr('href'),

            //узнаем высоту от начала страницы до блока на который ссылается якорь
            top = $(id).offset().top;

        //анимируем переход на расстояние - top за 1500 мс
        $('body,html').animate({ scrollTop: top }, 1500);
    });
});


// // Кнопка наверх
// $(window).scroll(function() {
//     if ($(this).scrollTop() != 0)
//         $('#toTop').fadeIn();
//     else
//         $('#toTop').fadeOut();

// });
// $('#toTop').click(function() {
//     $('body, html').animate({ scrollTop: 0 }, 1000);
// });


// $(document).ready(function() {
//     $('a[href^="#"]').click(function() {
//         elementClick = $(this).attr("href");
//         destination = $(elementClick).offset().top;
//         $('html').animate({ scrollTop: destination }, 1100);
//         return false;
//     });
// });



var header = $('.header'),
    scrollPrev = 0;

$(window).scroll(function() {
    var scrolled = $(window).scrollTop();

    if (scrolled > 100 && scrolled > scrollPrev) {
        header.addClass('out');
    } else {
        header.removeClass('out');
    }
    scrollPrev = scrolled;
});


//#region Полоса загрузки в процентах
let percentComplete = $("<span/>", {
    "class": "sr-only",
    html: "90% Complete"
})

let progressbar = $("<div/>", {
    "class": "progress-bar",
    "role": "progressbar",
    "aria-valuenow": 90,
    "aria-valuemin": "0",
    "aria-valuemax": "100",
    "style": "height: 90%;",
    html: percentComplete

})

let verticalProgressBar = $("<div/>", {
        "class": "progress progress-bar-vertical",
        html: progressbar
    })
    //#endregion

//#region Main INFO
let imgCardInside = $("<img/>", {
    "src": "https://media1.popsugar-assets.com/files/thumbor/NiU8Gj-i_HbjlfUgXrRK_jW3MeM/fit-in/550x550/filters:format_auto-!!-:strip_icc-!!-/2018/01/10/765/n/43463692/12a22f695a564bb32c3379.99027066_edit_img_image_44490285_1515603002/i/PicsArt-POPSUGAR-Travel-Challenge-Winners.jpg",
    "alt": ""
});

let imgCard = $("<div/>", {
    "class": "img_card",
    html: imgCardInside
});


let ahref = $("<a/>", {
    "href": "#",
    html: imgCard
});
//#endregion

//#region Detail Info
let dreamTitle = $("<div/>", {
    "class": "dream_title",
    html: "DREAM#1"
});
//#endregion


function loadDreams() {
    $.getJSON("json/gen_dreams.json", function(data) {
        $("<div/>", {
            "class": "dream-card",
            html: verticalProgressBar
        }).appendTo("#test");

        $("<div/>", {
            "class": "main_info",
            html: ahref
        }).appendTo("#test");

        $("<div/>", {
            "class": "detail_info",
            "id": "detail_info",
            html: dreamTitle,
        }).appendTo("#test");

        $("<div/>", {
            "class": "dream_descrip",
            html: "Lorem ipsum dolor sit amet consectetur adipisicing..."
        }).appendTo("#detail_info");

        $("<div/>", {
            "class": "dream_bottom",
            "id": "dream_bottom",
            html: "Lorem ipsum dolor sit amet consectetur adipisicing..."
        }).appendTo("#detail_info");

        $("<div/>", {
            "class": "dream_percent",
            html: "90%"
        }).appendTo("#dream_bottom");

        $("<div/>", {
            "class": "days_people",
            "id": "days_people",
            html: "90%"
        }).appendTo("#dream_bottom");





        // dreamSec = document.getElementById("dream_cards");
        // $('#dream_cards').html('< p > adcda < /p>');
        // for (var key in data) {

        //     console.log(key);

        // }
        // $.each(data, function(key, val) {
        //     items.push("<li  id='" + key + "'>" + val + "</li>");
        // });

        // $("<ul/>", {
        //     "class": "my-new-list",
        //     html: items.join("")
        // }).appendTo("body");
    });
}


//переключение вкладок

$(document).ready(function() {
    $('#pills-log-in-tab').on('click', function(e) {
        e.preventDefault()
        $(this).addClass('active');
        let twoTab = document.getElementById('pills-sign-up-tab');
        $(twoTab).removeClass('active');

        let firstContent = document.getElementById('pills-log-in');
        $(firstContent).addClass('show');
        $(firstContent).addClass('active');

        let secondContent = document.getElementById('pills-sign-up');
        $(secondContent).removeClass('show');
        $(secondContent).removeClass('active');

    });
    $('#pills-sign-up-tab').on('click', function(e) {
        e.preventDefault()
        $(this).addClass('active');
        let two = document.getElementById('pills-log-in-tab');
        $(two).removeClass('active');

        let firstContent = document.getElementById('pills-sign-up');
        $(firstContent).addClass('show');
        $(firstContent).addClass('active');

        let secondContent = document.getElementById('pills-log-in');
        $(secondContent).removeClass('show');
        $(secondContent).removeClass('active');


    });
});


//Открытие Start Dreams если авторизован
$(document).ready(function() {
    let getToken = window.localStorage.getItem('Token');
    if (getToken != null) {
        $(".btn_event").attr("href", "start_dream.html");
        var elem = document.getElementById('loginId');
        elem.parentNode.removeChild(elem);
        var elem2 = document.getElementById('signUpId');
        elem2.parentNode.removeChild(elem2);

    } else {
        $(".btn_event").attr("data-toggle", "modal");
        $(".btn_event").attr("data-target", "#start_dream_popUp");
    }
});
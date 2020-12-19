function diffDates(day_one, day_two) {
    return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
};

function GetDreamById(dreamId){

	let getFullPathDream = "https://api.9thplanet.ca/dreams/" + dreamId;
	let userId = window.localStorage.getItem("UserId");

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
            console.log("GetDreamWithToken Success", data);            

            let percent = Math.round(data['money'] * 100 / data['price'])
            let dreamDescrip = data['infoAboutDream'];
            let aboutAuthor = data['infoAboutYourself'];
            let dayCount = diffDates(new Date(data['expirationTime']), new Date());
            if (dayCount<0) {
                dayCount = '0';
            }
            let moneyRound = Math.round(data['money'] / 100000, 1);
            let priceRound = Math.round(data['price'] / 100000, 1);
            let dollarCurrently = (moneyRound).toString().replace('.', ',');
            let dollarNeeded = (priceRound).toString().replace('.', ',');
            let dreamLocation = data['city']['names']['en-us']
            let image = '';
            Carusel(data['photos']);
            try {
                image = data['photos'][0]['sizes']['medium'];
            } catch (error) {
                
                image ='img/No_image.png';
            }
            let getLike = '';
            if (data['likes'].indexOf( userId ) != -1) {
                getLike = 'fas';
            } else {
                getLike = 'far';
            }
            
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
            document.getElementById('donate_dream_percent').innerHTML =percent + "%";
            document.getElementById('donate_dream_count_day').innerHTML =dayCount;
            document.getElementById('donate_dream_count_backer').innerHTML =backers;
            document.getElementById('donate_dream_count_money').innerHTML =dollarCurrently + "k";
            document.getElementById('donate_dream_count_price').innerHTML =dollarNeeded + "k";
            // document.getElementById('donate_dream_location').innerHTML =dreamLocation;
            $('#donate_dream_location').attr('title', dreamLocation);
            $('#donate_dream_like').attr('title', getLikeCount + " likes");
    
            document.getElementById('donate_dream_about_author').innerHTML =aboutAuthor;
            document.getElementById('donate_dream_about_dream').innerHTML =dreamDescrip;
            document.getElementById('donate_dream_like').classList.add(getLike);
            document.getElementById('donate_favorite_icon').classList.add(getFavorite);
            $('#donate_dream_progress_bar').attr('aria-valuenow', percent).css('height', percent + "%");



        })
        .catch(function (err) {
            console.log("GetDreamWithToken Error", err);
        });






    // $.getJSON(getFullPathDream, function(data) 
    // {
	// 	console.log(data['isInFavorites']);
	// 	//#region Шаблон карточки с переменными
	// 	let percent = Math.round(data['money'] * 100 / data['price'])
	// 	let dreamDescrip = data['infoAboutDream'];
	// 	let aboutAuthor = data['infoAboutYourself'];

	// 	let dayCount = diffDates(new Date(data['expirationTime']), new Date());
	// 	if (dayCount<0) {
	// 		dayCount = '0';
	// 	}
	// 	let moneyRound = Math.round(data['money'] / 100000, 1);
	// 	let priceRound = Math.round(data['price'] / 100000, 1);
	// 	let dollarCurrently = (moneyRound).toString().replace('.', ',');
	// 	let dollarNeeded = (priceRound).toString().replace('.', ',');
	// 	let dreamLocation = data['city']['names']['en-us']
    //     let image = '';
    //     Carusel(data['photos']);
	// 	try {
	// 		image = data['photos'][0]['sizes']['medium'];
	// 	} catch (error) {
			
	// 		image ='img/No_image.png';
	// 	}
	// 	let getLike = '';
	// 	if (data['likes'].indexOf( userId ) != -1) {
	// 		getLike = 'fas';
	// 	} else {
	// 		getLike = 'far';
	// 	}

	// 	let getLikeCount = data['likesCount'];
	// 	let backers = data['donatesCount'];

    //         //#endregion

    //     document.getElementById('donate_dream_name').innerHTML = data['name'];
    //     document.getElementById('donate_dream_percent').innerHTML =percent + "%";
    //     document.getElementById('donate_dream_count_day').innerHTML =dayCount;
    //     document.getElementById('donate_dream_count_backer').innerHTML =backers;
    //     document.getElementById('donate_dream_count_money').innerHTML =dollarCurrently + "k";
    //     document.getElementById('donate_dream_count_price').innerHTML =dollarNeeded + "k";
	// 	// document.getElementById('donate_dream_location').innerHTML =dreamLocation;
	// 	$('#donate_dream_location').attr('title', dreamLocation);
	// 	$('#donate_dream_like').attr('title', getLikeCount + " likes");

    //     document.getElementById('donate_dream_about_author').innerHTML =aboutAuthor;
    //     document.getElementById('donate_dream_about_dream').innerHTML =dreamDescrip;
    //     document.getElementById('donate_dream_like').classList.add(getLike);
	// 	$('#donate_dream_progress_bar').attr('aria-valuenow', percent).css('height', percent + "%");
    // });


};
function PutLikeToDream (dreamId, elem) {
    let token = window.localStorage.getItem("Token");
    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/dreams/" + dreamId + "/like",
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
function RemoveLikeToDream (dreamId, elem) {
    let token = window.localStorage.getItem("Token");
    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/dreams/" + dreamId + "/like",
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

function PutFavoriteToDream (dreamId, elem) {
    let token = window.localStorage.getItem("Token");
    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/user/favorites/" + dreamId,
        type: 'POST',
        headers: {
            accept: "application/json",
            accessToken: token,
        },
    })
        .then(function (response) {
            console.log("Put favorite response", response);
            elem.classList.remove("far"); 
            elem.classList.add("fas"); 
        })
        .catch(function (err) {
            console.log("Put favorite error", err);
        });
};
function RemoveFavoriteToDream (dreamId, elem) {
    let token = window.localStorage.getItem("Token");
    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/user/favorites/" + dreamId,
        type: 'DELETE',
        headers: {
            accept: "application/json",
            accessToken: token,
        },
    })
        .then(function (response) {
            console.log("Remove favorite response", response);
            elem.classList.remove("fas"); 
            elem.classList.add("far"); 

        })
        .catch(function (err) {
            console.log("Remove favorite error", err);
        });
};
function Carusel(photoList) {
    temp = '';
    for (let key in photoList) {
        const urlImg = photoList[key]['sizes']['orig'];
        let itemTemplate = '<div class="carousel-item"><img class="d-block w-100" src="'+urlImg+'" alt="..."></div>';
        temp+=itemTemplate;
    }
    document.getElementById('donateCarouselId').innerHTML = temp;
    document.getElementsByClassName('carousel-item')[0].classList.add('active')
}


function GetDreamWithToken (getFullPathDream) {
    let token = window.localStorage.getItem("Token");
    $.ajax({
        crossDomain: true,
        url: getFullPathDream,
        type: 'GET',
        headers: {
            accept: "application/json",
            accessToken: token,
        },
    })
        .then(function (response) {
            console.log("GetDreamWithToken Success", response);
            return response;
        })
        .catch(function (err) {
            console.log("GetDreamWithToken Error", err);
        });

};


$('document').ready(function() {
	let getDreamId = window.location.href.toString().split('.html?')[1];
    GetDreamById(getDreamId);
    
	window.onclick=function(e){
        var elem = e ? e.target : window.event.returnValue;
        if (elem.id=="donate_favorite_icon") {
            if (elem.classList.contains("far")) {
                PutFavoriteToDream (getDreamId, elem);
            }
            if (elem.classList.contains("fas")) {
                RemoveFavoriteToDream (getDreamId, elem);
            }
		}
		if (elem.id=="donate_dream_like") {
            if (elem.classList.contains("far")) {
                PutLikeToDream (getDreamId, elem);
            }
            if (elem.classList.contains("fas")) {
                RemoveLikeToDream (getDreamId, elem);
            }
        }
        document.getElementById("donateBuckItid").href = "payment.html?" + getDreamId;
    }

    


});

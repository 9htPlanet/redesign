class Dream{
    static diffDates(day_one, day_two) {
        return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
    }
    static PutLikeToDream(dreamId, elem) {
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
    }

    static RemoveLikeToDream(dreamId, elem) {
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
    }

    static PutFavoriteToDream(dreamId, elem) {
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
    }

    static RemoveFavoriteToDream(dreamId, elem) {
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
    }

}
(() => {
    const button = document.getElementById("start_dream_button");
    button.disabled = true;
    button.innerHTML = "";

    if (isAuth()) {
        apiGetJson("dreams/my")
            .then((data) => {
                button.disabled = false;
                if (data.length > 0) {
                    button.innerHTML = "Go To My Dream";
                    button.setAttribute("onclick", "location.href='profile.html'");
                } else {
                    button.innerHTML = "Start Dream";
                }
            })
    } else {
        button.disabled = false;
        button.innerHTML = "Start Dream";
    }

    if (location.search) {
        document.querySelector(".hero").setAttribute("style",

            `background-image: linear-gradient(to right, rgba(47, 48, 58, 0.4), rgba(47, 48, 58, 0.4)), url("${location.search.substring(1)}")`)
    }

})()

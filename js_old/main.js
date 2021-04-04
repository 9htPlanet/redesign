(() => {
    const button = document.getElementById("start_dream_button");
    button.disabled = true;
    button.innerHTML = "";

    if (isAuth()) {
        apiGetJson("dreams/my")
            .then((data) => {
                if (data.length > 0) {
                    button.innerHTML = "Go To My Dream";
                    button.setAttribute("onclick", "location.href='profile.html'");
                } else {
                    button.disabled = false;
                    button.innerHTML = "Start Dream";
                }
            })
    } else {
        button.disabled = false;
        button.innerHTML = "Start Dream";
    }

})()
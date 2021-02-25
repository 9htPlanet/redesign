if (isAuth()) {
    apiGetJson("dreams/my")
        .then((data) => {
            if (data.length > 0) {
                const button = document.getElementById("start_dream_button");
                button.removeAttribute("data-modal-start-dream-open")
                button.innerHTML = "Go To My Dream"
                button.setAttribute("onclick", "location.href='profile.html'")
            }
        })
}
function resizeTextArea(value) {
    let textArea = document.getElementById(value);
    textArea.onfocus = function (event) {
        textArea.style.height = "200px";
    }
    textArea.onblur = function (event) {
        textArea.style.height = "40px";
    }
}

$("document").ready(function () {
    resizeTextArea("info_id");
    resizeTextArea("dream_info_id");
    $("#start_dream_id").submit(function (event) {
        let photoIds = window.localStorage.getItem("photosId");

        let dreamName = document.getElementById('dream_name_id').value;
        let category = document.getElementById('selected_category_id').innerText.toLowerCase();
        let city = document.getElementById('selected_city_id').innerText;
        let infoAboutYourSelf = document.getElementById('info_id').value;
        let dreamInformation = document.getElementById('dream_info_id').value;
        let sourceDreamPrice = document.getElementById('required_money_id').value;
        let preparedDreamPrice = parseFloat(sourceDreamPrice.replace(/,/, '.')) * 100

        const url = "https://api.9thplanet.ca/dreams";
        const params =
            "name=" + dreamName +
            "&infoAboutYourself=" + infoAboutYourSelf +
            "&infoAboutDream=" + dreamInformation +
            "&price=" + preparedDreamPrice +
            "&photos=" + photoIds +
            "&city=" + city +
            "&category=" + category +
            "&videos=" + "" +
            "&documents=" + "";

        const request = new XMLHttpRequest();
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.setRequestHeader("accessToken", window.localStorage.getItem('Token'));
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                location.href = 'donate.html?' + request.responseText["id"];
                console.log(request.responseText["id"]);
            } else {
                document.getElementById("server_response_id").innerHTML = request.responseText;
            }
        });
        request.send(params);

        event.preventDefault();


    });
});
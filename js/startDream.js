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
        let ser = $('#start_dream_id').serializeArray()
        console.log(ser);
        let city = document.getElementById('selected_city_id').innerText;
        let category = document.getElementById('selected_category_id').innerText;
        event.preventDefault();


    });
});
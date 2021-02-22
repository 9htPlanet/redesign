// ************************ Drag and drop ***************** //
let dropArea = document.getElementById("drop-area");

// Prevent default drag behaviors
["dragenter", "dragover", "dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, preventDefaults, false);
    document.body.addEventListener(eventName, preventDefaults, false);
});

// Highlight drop area when item is dragged over it
["dragenter", "dragover"].forEach((eventName) => {
    dropArea.addEventListener(eventName, highlight, false);
});
["dragleave", "drop"].forEach((eventName) => {
    dropArea.addEventListener(eventName, unhighlight, false);
});

// Handle dropped files
dropArea.addEventListener("drop", handleDrop, false);

function preventDefaults(e) {
    e.preventDefault();
    e.stopPropagation();
}

function highlight(e) {
    dropArea.classList.add("highlight");
}

function unhighlight(e) {
    dropArea.classList.remove("active");
}

function handleDrop(e) {
    var dt = e.dataTransfer;
    var files = dt.files;

    handleFiles(files);
}

let uploadProgress = [];
let progressBar = document.getElementById("progress-bar");

function initializeProgress(numFiles) {
    progressBar.value = 0;
    uploadProgress = [];

    for (let i = numFiles; i > 0; i--) {
        uploadProgress.push(0);
    }
}

function updateProgress(fileNumber, percent) {
    uploadProgress[fileNumber] = percent;
    let total =
        uploadProgress.reduce((tot, curr) => tot + curr, 0) / uploadProgress.length;
    console.debug("update", fileNumber, percent, total);
    progressBar.value = total;
}

function handleFiles(files) {
    files = [...files];
    initializeProgress(files.length);
    files.forEach(uploadFile);
//   files.forEach(previewFile);
}

function previewFile(file) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        let img = document.createElement("img");
        if (reader.result.substr(0, 30).indexOf("application/pdf") > 0) {
            img.src = "img/pdf_icon.png";
        } else if (reader.result.substr(0, 30).indexOf("image") > 0) {
            img.src = reader.result;
            img.id = window.localStorage.getItem("imgId");

        }
        // img.src = reader.result;
        document.getElementById("gallery").appendChild(img);
    };
}


function previewFile2(file, id) {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
        let img = document.createElement("img");
        if (reader.result.substr(0, 30).indexOf("application/pdf") > 0) {
            img.src = "img/pdf_icon.png";
        } else if (reader.result.substr(0, 30).indexOf("image") > 0) {
            img.src = reader.result;
            img.id = id;
        }
        document.getElementById("gallery").appendChild(img);
    };
}


function GetIdForPhoto() {

    apiGetJson("photos/upload")
        .then(function (response) {
            let stringified = JSON.stringify(response);
            var photoId = JSON.parse(stringified)["id"];
            console.log(photoId);

            return photoId;
        });
}

function uploadFile(file, i) {
    let token = window.localStorage.getItem("Token");

    // console.log(elem);

    apiGetJson("photos/upload")
        .then((data) => {
            const photoId = data["id"];
            console.log(photoId);
            window.localStorage.setItem("imgId", photoId)
            let elem = document.getElementById("fileElem").files[0];
            previewFile2(elem, photoId);

            return apiPutFileJson("photos/" + photoId, elem)

        })
        .then((data) => {
            console.log("Success:", data);
        })
        .catch((error) => {
            console.error("Error:", error);
        });
}

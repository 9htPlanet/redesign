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
    let token = window.localStorage.getItem("Token");

    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/photos/upload",
        headers: {
            accept: "application/json",
            accessToken: token,
        },
    }).done(function (response) {
        let stringified = JSON.stringify(response);
        var photoId = JSON.parse(stringified)["id"];
        console.log(photoId);

        return photoId;
    });
}

function uploadFile(file, i) {
    let token = window.localStorage.getItem("Token");

    // console.log(elem);

    $.ajax({
        crossDomain: true,
        url: "https://api.9thplanet.ca/photos/upload",
        headers: {
            accept: "application/json",
            accessToken: token,
        },
    }).done(function (response) {
        let stringified = JSON.stringify(response);
        var photoId = JSON.parse(stringified)["id"];
        console.log(photoId);
        window.localStorage.setItem("imgId", photoId)
        let elem = document.getElementById("fileElem").files[0];
        previewFile2(elem, photoId);

        fetch("https://api.9thplanet.ca/photos/" + photoId, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
                accessToken: token,
            },
            body: elem,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Success:", data);
            })
            .catch((error) => {
                console.error("Error:", error);
            });

        // $.ajax({
        //     crossDomain: true,
        //     contentType: "image/*",
        //     url: 'https://api.9thplanet.ca/photos/' + photoId,

        //     type: 'PUT',
        //     headers: {
        //         accept: "application/json",
        //         accessToken: token,
        //     },
        //     data: elem
        // })
        //     .then(function (response) {
        //         console.log("Put photo response", response);

        //     })
        //     .catch(function (err) {
        //         console.log("Put photo error", err);
        //     });

        // var xhr = new XMLHttpRequest()
        // var formData = new FormData()
        // xhr.open('POST', url, true)
        // xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest')

        // // Update progress (can be used to show progress indicator)
        // xhr.upload.addEventListener("progress", function(e) {
        //     updateProgress(i, (e.loaded * 100.0 / e.total) || 100)
        // })

        // xhr.addEventListener('readystatechange', function(e) {
        //     if (xhr.readyState == 4 && xhr.status == 200) {
        //         updateProgress(i, 100) // <- Add this
        //     } else if (xhr.readyState == 4 && xhr.status != 200) {
        //         // Error. Inform the user
        //     }
        // })

        // formData.append('upload_preset', 'ujpu6gyk')
        // formData.append('file', file)
        // xhr.send(formData)
    });
}

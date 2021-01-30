"use strict";

let token = window.localStorage.getItem("Token");

Dropzone.autoDiscover = false;

const doStuffAsync = (file, done) => {

    fetch('https://api.9thplanet.ca/photos/upload', {
        headers: {
            "Content-Type": "application/json",
            accessToken: token,
        },
    })
        .then(function (response) {
            response.json()
                .then(function (data) {
                    file.dynamicUploadUrl = "https://api.9thplanet.ca/photos/" + data['id']
                    done();
                })
        })
}

const getMeSomeUrl = (files) => {
    return `${files[0].dynamicUploadUrl}`;
}

let myDropzone = new Dropzone("div#upload_file_id", {
    method: "put",
    uploadMultiple: true,  //upload multiple files
    maxFilesize: 10,
    addRemoveLinks: true,
    accept: doStuffAsync,
    url: getMeSomeUrl,
    headers: {
        accept: "application/json",
        accessToken: token,
        'Cache-Control': null,
        'X-Requested-With': null
    },
    success: function (file, response) {
        console.log(file)
        console.log(response)
    },
    error: function (response) {
        console.log(response)
    },

});
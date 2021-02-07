"use strict";

let token = window.localStorage.getItem("Token");
Dropzone.autoDiscover = false;
Dropzone.options.myAwesomeDropzone = false;

/**
 * Здесь будет храниться список id загруженных файлов
 */
let fileIds = [];

async function upload(file) {
    const uploadRequest = await fetch('https://api.9thplanet.ca/photos/upload', {
        headers: {
            "Content-Type": "application/json",
            accessToken: token,
        },
    });
    const json = await uploadRequest.json();
    const urlForUpload = "https://api.9thplanet.ca/photos/" + json['id'];

    let result = await fetch(urlForUpload, {
        method: 'PUT',
        body: file,
        headers: {
            accessToken: token
        }
    });

    fileIds.push(json['id']);
    window.localStorage.setItem("photosId", fileIds);
    return result;
}

let myDropzone = new Dropzone("#upload_file_id", {
        method: "put",
        acceptedFiles: "image/*",
        uploadMultiple: false,
        url: async files => {
            await upload(files[0])
        },
        headers: {
            accept: "application/json",
            accessToken: token,
        },
        error: function (file, error) {
            if (file && error) {
                var msgEl = $(file.previewElement).find('.dz-error-message');
                msgEl.text(error.message);
                msgEl.show();
            }
        }
        /*success: function () {
            alert("Success!")
        },
        error: function (error) {
            alert("error!")
        }*/
    })
;
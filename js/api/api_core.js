const API_PATCH = "https://api.9thplanet.ca/"
// const API_PATCH = "http://0.0.0.0:5000/"

/*
Пример использования:

apiGet("dreams/generate")
    .then(function (response) {
        return response.json()
    })
    .then(function (data){
        console.log(data)
    });*/

async function apiPost(patch, formParams, requireAuth = false) {
    return await api(patch, "POST", formParams, null, requireAuth)
}

async function apiPostJson(patch, formParams, requireAuth = false) {
    return await api(patch, "POST", formParams, null, requireAuth, true)
}

async function apiGet(patch, requireAuth = false) {
    return await api(patch, "GET", null, null, requireAuth)
}

async function apiGetJson(patch, requireAuth = false) {
    return await api(patch, "GET", null, null, requireAuth, true)
}

async function apiGetJsonQuery(patch, queryParams, requireAuth = false) {
    return await api(patch, "GET", null, null, requireAuth, true, queryParams)
}

async function apiDelete(patch, requireAuth = false) {
    return await api(patch, "DELETE", null, null, requireAuth)
}

async function apiDeleteJson(patch, requireAuth = false) {
    return await api(patch, "DELETE", null, null, requireAuth, true)
}

async function apiPutFile(patch, file, requireAuth = false) {
    return await api(patch, "PUT", null, file, requireAuth)
}

async function apiPutFileJson(patch, file, requireAuth = false) {
    return await api(patch, "PUT", null, file, requireAuth, true)
}

async function apiPutJson(patch, requireAuth = false) {
    return await api(patch, "PUT", null, null, requireAuth, true)
}

async function api(patch, method, formParams = null, file = null, requireAuth = false, useJson = false, queryParams = {},
                   ignoreErrors = false) {
    const token = window.localStorage.getItem("Token")
    const headers = {
        Accept: "application/json"
    }
    if (token != null) {
        headers["accessToken"] = token
    } else {
        //todo: что нужно сделать здесь?
    }
    const params = {
        method: method,
        headers: headers
    };

    if (formParams != null) {
        const data = new URLSearchParams();

        for (const key in formParams) {
            data.append(key, formParams[key]);
        }

        params["body"] = data
        params.headers["Content-Type"] = "application/x-www-form-urlencoded"

    } else if (file != null) {
        params["body"] = file
    }

    const url = new URL(API_PATCH + patch)
    url.search = new URLSearchParams(queryParams).toString();

    const response = await fetch(url.toString(), params)
    if (response.status >= 200 && response.status < 300) {
        return response.json();
    } else {
        if (response.status === 401) {
            if (token != null) {
                window.localStorage.clear();
                window.location = window.location;
                return;
            } else {
                window.localStorage.clear();
            }
        }
        let errorJson
        try {
            errorJson = await response.json();
        } catch (e) {
            //nothing
        }

        if (errorJson.errorMessage && errorJson.errorCode) {
            let error = new PlanetNetworkError(response.status, errorJson.errorCode, errorJson.errorMessage);
            console.log(error)
            throw error;
        } else {
            console.log("Неожиданная ошибка")
            console.log(response);
            //todo: что делать в этом случае?
            //throw new Error("Что-то пошло не так");
        }
    }
}

class PlanetNetworkError extends Error {
    constructor(status, code, message) {
        super(message);
        this.name = "PlanetNetworkError";
        this.status = status;
        this.code = code;
        this.message = message;
    }
}



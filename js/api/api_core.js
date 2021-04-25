const API_PATCH = "https://api.9thplanet.ca/"

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

async function api(patch, method, formParams = null, file = null, requireAuth = false, useJson = false, queryParams = {}) {
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
        headers: headers,
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

    if (response.status === 401) {
        window.localStorage.clear()
        throw new Error("401 Unauthorized")
    }

    if (useJson) {
        return response.json();
    } else {
        return response;
    }
}



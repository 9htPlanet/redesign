const AuthCallbacks = {
    queue: [],
    executeCallbacks() {
        while (this.queue.length > 0) {
            (this.queue.shift())()
        }
    }
}

function isAuth() {
    return window.localStorage.getItem("Token") != null
}

function ifAuth(f) {
    if (isAuth()) {
        f()
    } else {
        AuthCallbacks.queue.push(f);
        showLoginPopup();
    }
}

function showLoginPopup() {
    if (!isLoginOrSignUpShown()) {
        toggleModalLogin()
    }
}
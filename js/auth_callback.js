const AuthCallbacks = {
    queue: [],
    addCallback: function (callback) {
        this.queue.push(callback);
    },
    isWaiting: function () {
        return this.queue.length > 0
    },
    clearQueue: function () {
        this.queue = [];
    },
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
        AuthCallbacks.addCallback(f);
        showLoginPopup();
    }
}

function showLoginPopup() {
    if (!isLoginOrSignUpShown()) {
        toggleModalLogin()
    }
}
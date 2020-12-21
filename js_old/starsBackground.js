const limit = 100, // Max number of starts
    body = document.body;
loop = {
    //initilizeing
    start: function () {
        const documentFragment = document.createDocumentFragment();

        let body = document.body;
        let html = document.documentElement;

        let height = Math.max(body.scrollHeight, body.offsetHeight,
            html.clientHeight, html.scrollHeight, html.offsetHeight);
        for (let i = 0; i < limit; i++) {
            const star = this.newStar();
            // var star = this.addStar();

            star.style.top = this.rand() * height - 50 + "px";
            star.style.left = this.rand() * 100 + "%";
            star.style.webkitAnimationDelay = this.rand() + this.randomInteger() + "s";
            star.style.mozAnimationDelay = this.rand() + this.randomInteger() + "s";

            documentFragment.appendChild(star)
        }

        body.appendChild(documentFragment);
    },
    //to get random number
    rand: function () {
        return Math.random();
    },
    randomInteger: function () {
        let min = 0;
        let max = 2;
        let rando = min - 0.3 + Math.random() * (max - min + 0.5);
        return Math.round(rando);
    },

    //createing html dom for star
    newStar: function () {
        const d = document.createElement('div');
        d.className = "star"
        return d;
    },

    addStar: function () {
        let dom = document.getElementsByClassName('star')[0];
        dom.insertAdjacentHTML('afterEnd', '<figure class="star"></figure>');
    }


};
loop.start();

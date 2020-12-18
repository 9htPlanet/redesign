function LoadTitle(title) {
    let parent = document.getElementById('dream_container');
    let before = document.getElementById('dream_cards');
    let p = document.createElement('h3');
    p.innerHTML = title;
    parent.insertBefore(p, before);
}

function diffDates(day_one, day_two) {
    return Math.round((day_one - day_two) / (60 * 60 * 24 * 1000));
};

function FindCategory(url) {

    console.log(url.indexOf('technology'));
    console.log(url.indexOf('technology') + 1);
    if (url.indexOf('technology') + 1 > 0) {
        return 'Technology';
    }
    if (url.indexOf('art') + 1 > 0) {
        return 'Art';
    }
    if (url.indexOf('music') + 1 > 0) {
        return 'Music';
    }
    if (url.indexOf('travel') + 1 > 0) {
        return 'Travel';
    }
    if (url.indexOf('entertainment') + 1 > 0) {
        return 'Entertainment';
    }
    if (url.indexOf('birthday') + 1 > 0) {
        return 'Birthday';
    }
    if (url.indexOf('hobby') + 1 > 0) {
        return 'Hobby';
    }
    if (url.indexOf('recreation') + 1 > 0) {
        return 'Recreation';
    }
    if (url.indexOf('sports') + 1 > 0) {
        return 'Sports';
    }
    if (url.indexOf('health') + 1 > 0) {
        return 'Health';
    }




}



$('document').ready(function() {

    let per = window.location.href.toString().split('.html?')[1];
    loadDreams(per);
    let category = FindCategory(per);
    if(!!category)
        LoadTitle(category);
    else
        LoadTitle('Popular Dreams');

});
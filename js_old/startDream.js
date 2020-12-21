$('document').ready(function () {

    $.getJSON("https://api.9thplanet.ca/dictionary/cities", function (data) {
        let contents = []
        for (let key in data) {
            let city = data[key]['id'];
            contents.push('<input type="button" class="dropdown-item" type="button" value="' + city + '"/>')
        }
        $('#menuItems_2').append(contents.join(""))
        $('#empty').hide()
    });

    $.getJSON("https://api.9thplanet.ca/dictionary/categories", function (data) {
        let contents = []
        for (let key in data) {
            let category = data[key]['key'];
            contents.push('<input type="button" class="dropdown-item" type="button" value="' + category + '"/>')
        }
        $('#menuItems').append(contents.join(""))
        $('#empty').hide()
    });


    //Find the input searchCategory box
    let searchCategory = document.getElementById("searchCategory")

    let searchCities = document.getElementById("searchCities")

    //Find every item inside the dropdown
    let items = document.getElementsByClassName("dropdown-item")

    function buildDropDown(values) {
        let contents = []
        for (let name of values) {
            contents.push('<input type="button" class="dropdown-item" type="button" value="' + name + '"/>')
        }
        $('#menuItems').append(contents.join(""))

        //Hide the row that shows no items were found
        $('#empty').hide()
    }

    function buildDropDown_2(values) {
        let contents = []
        for (let name of values) {
            contents.push('<input type="button" class="dropdown-item" type="button" value="' + name + '"/>')
        }
        $('#menuItems_2').append(contents.join(""))

        //Hide the row that shows no items were found
        $('#empty').hide()
    }


    //Capture the event when user types into the searchCategory box
    // window.addEventListener('input', function() {
    //     filter(search.value.trim().toLowerCase())
    // })

    //For every word entered by the user, check if the symbol starts with that word
    //If it does show the symbol, else hide it
    function filter(word) {
        let length = items.length
        let collection = []
        let hidden = 0
        for (let i = 0; i < length; i++) {
            if (items[i].value.toLowerCase().startsWith(word)) {
                $(items[i]).show()
            } else {
                $(items[i]).hide()
                hidden++
            }
        }

        //If all items are hidden, show the empty view
        if (hidden === length) {
            $('#empty').show()
        } else {
            $('#empty').hide()
        }
    }

    //If the user clicks on any item, set the title of the button as the text of the item
    $('#menuItems').on('click', '.dropdown-item', function () {
        $('#dropdown_categories').text($(this)[0].value)
        $("#dropdown_categories").dropdown('toggle');
    })

    $('#menuItems_2').on('click', '.dropdown-item', function () {
        $('#dropdown_cities').text($(this)[0].value)
        $("#dropdown_cities").dropdown('toggle');
    })
    // buildDropDown(categories)
    // buildDropDown_2(cities)

    $("#publishDream_id").submit(function (event) {

        let allLinks = document.getElementById('gallery');
        let matches = allLinks.querySelectorAll("img");
        let photoCollection = []
        let documentCollection = []
        for (let i = 0; i < matches.length; i++) {
            let getSrc = matches[i].getAttribute('src');
            let getId = matches[i].getAttribute('id');
            if (getSrc.substr(0, 20).indexOf('application/pdf') > 0) {
                documentCollection.push(getId)
            } else if (getSrc.substr(0, 20).indexOf('image') > 0) {
                photoCollection.push(getId);
            }
        }

        let photos = photoCollection.join(',');
        console.log(photos);
        let documents = documentCollection.join(',');
        let dreamName = document.getElementById('dreamName').value;
        let dreamCategory = document.getElementById('dropdown_categories').innerHTML;
        let dreamCitites = document.getElementById('dropdown_cities').innerHTML;
        let infoAbouYourSelf = document.getElementById('infoAboutYourself').value;
        let dreamInformation = document.getElementById('dreamInform').value;
        let dreamPrice = document.getElementById('price').value;
        const request = new XMLHttpRequest();
        const url = "https://api.9thplanet.ca/dreams";
        const params = "name=" + dreamName + "&infoAboutYourself=" + infoAbouYourSelf + "&infoAboutDream=" + dreamInformation + "&price=" + dreamPrice + "&photos=" + photos + "&city=" + dreamCitites + "&category=" + dreamCategory + "&videos=" + dreamPrice + "&documents=" + documents;
        console.log(params);
        request.open("POST", url, true);
        request.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        request.setRequestHeader("accessToken", window.localStorage.getItem('Token'));
        request.addEventListener("readystatechange", () => {
            if (request.readyState === 4 && request.status === 200) {
                console.log(request.responseText);
            }
        });
        request.send(params);
        event.preventDefault();
    });

});
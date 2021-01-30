"use strict";

function makeOptionCityStructure() {
    let cities = document.getElementsByClassName("options-container-city")[0];
    $.getJSON('https://api.9thplanet.ca/dictionary/cities', function (data) {
        let sortedCities = data.sort(function (obj1, obj2) {
            if (obj1.id < obj2.id) return -1;
            if (obj1.id > obj2.id) return 1;
        });

        let opts = '';
        for (let i = 0; i < sortedCities.length; i++) {

            let opt = `<div class="option option-city">
                        <input type="radio" class="radio" id="${sortedCities[i]['id']}" name="city"/>
                        <label for="${sortedCities[i]['id']}">${sortedCities[i]['names']['en-us']}</label>
                       </div>`
            opts += opt;
        }
        cities.innerHTML += opts;
        customSelectBoxCity();

    });

}

function makeOptionCategoryStructure() {
    let categories = document.getElementsByClassName("options-container-category")[0];

    $.getJSON('https://api.9thplanet.ca/dictionary/categories', function (data) {
        let sortedCateg = data.sort(function (obj1, obj2) {
            if (obj1.key < obj2.key) return -1;
            if (obj1.key > obj2.key) return 1;
        });

        let opts = '';
        for (let i = 0; i < sortedCateg.length; i++) {

            let opt = `<div class="option option-category">
                        <input type="radio" class="radio" id="${sortedCateg[i]['key']}" name="category"/>
                        <label for="${sortedCateg[i]['key']}">${sortedCateg[i]['details'][0]['name']}</label>
                       </div>`
            opts += opt;
        }
        categories.innerHTML += opts;
        customSelectBoxCategory();

    });

}


function customSelectBoxCity() {
    const selected = document.querySelector(".selected-city");
    const optionsContainer = document.querySelector(".options-container-city");
    const searchBox = document.querySelector(".search-box-city input");

    let optionsList = document.querySelectorAll(".option-city");
    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");

        searchBox.value = "";
        filterList("");

        if (optionsContainer.classList.contains("active")) {
            searchBox.focus();
        }
    });

    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            selected.innerHTML = `<svg class="service-order-svg select-icon">
                                 <use href="./images/sprite.svg#location"></use>
                                 </svg>
                                 <span class="select-label" id="selected_city_id">${o.querySelector("label").innerHTML}</span>`
            optionsContainer.classList.remove("active");
        });
    });

    searchBox.addEventListener("keyup", function (e) {
        filterList(e.target.value);
    });

    const filterList = searchTerm => {
        searchTerm = searchTerm.toLowerCase();
        optionsList.forEach(option => {
            let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
            if (label.indexOf(searchTerm) != -1) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        });
    };

}


function customSelectBoxCategory() {
    const selected = document.querySelector(".selected-category");
    const optionsContainer = document.querySelector(".options-container-category");
    const searchBox = document.querySelector(".search-box-category input");

    let optionsList = document.querySelectorAll(".option-category");
    selected.addEventListener("click", () => {
        optionsContainer.classList.toggle("active");
        searchBox.value = "";
        filterList("");

        if (optionsContainer.classList.contains("active")) {
            searchBox.focus();
        }
    });

    optionsList.forEach(o => {
        o.addEventListener("click", () => {
            selected.innerHTML = `<svg class="service-order-svg select-icon">
                                 <use href="./images/sprite.svg#category"></use>
                                 </svg>
                                 <span class="select-label" id="selected_category_id">${o.querySelector("label").innerHTML}</span>`
            optionsContainer.classList.remove("active");
        });
    });

    searchBox.addEventListener("keyup", function (e) {
        filterList(e.target.value);
    });

    const filterList = searchTerm => {
        searchTerm = searchTerm.toLowerCase();
        optionsList.forEach(option => {
            let label = option.firstElementChild.nextElementSibling.innerText.toLowerCase();
            if (label.indexOf(searchTerm) != -1) {
                option.style.display = "block";
            } else {
                option.style.display = "none";
            }
        });
    };

}


$("document").ready(function () {
    makeOptionCategoryStructure();
    makeOptionCityStructure();
});




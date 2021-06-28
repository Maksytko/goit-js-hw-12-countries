import fetchCountries from './fetch-countries.js'
import countryMarkUp from '../partials/country-item.hbs'
import { alert, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = {
    searchInputEl: document.querySelector('.search-input'),
    countriesListEl: document.querySelector('.countries-list'),
    countryInfoDivEl: document.querySelector('.country-info')
}

const debounce = require('lodash.debounce')

const render = function (array) {
    refs.countriesListEl.innerHTML = ''
    refs.countryInfoDivEl.innerHTML = ''
    
    if (array.length > 10) {
        alert({
            text: 'Введите полное название страны',
        });

        return
    } else if (array.length > 1 && array.length <= 10) {
        const countriesMarkUp = [...array].map(item => `<li><p>${item.name}<p></li>`).join('')
        refs.countriesListEl.innerHTML = countriesMarkUp

        return
    } else if (array.length === 1) {
        refs.countryInfoDivEl.innerHTML = countryMarkUp(array[0])

        return
    } else {
        return
    }
}

refs.searchInputEl.addEventListener('input', debounce((event) => (fetchCountries(event.target.value)).then(render), 500))
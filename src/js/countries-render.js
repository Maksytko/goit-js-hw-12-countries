import fetchCountries from './fetch-countries.js'
import countryMarkUp from '../partials/country-item.hbs'
import { alert, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

const refs = {
    searchInputEl: document.querySelector('.search-input'),
    countriesListEl: document.querySelector('.countries-list')
}

const debounce = require('lodash.debounce')

const resolve = function (response) {
    if (!response.ok) {
        alert({
            text: 'Notice me, senpai!',
        })
        return
    }
    return response.json()
}

const render = function (array) {
    refs.countriesListEl.innerHTML = ''

    if (array.length > 10) {
        alert({
            text: 'Notice me, senpai!',
        });
        return
    } else if (array.length > 1 && array.length < 10) {
        const countriesMarkUp = [...array].map(item => `<li><p>${item.name}<p></li>`).join('')
        refs.countriesListEl.innerHTML = countriesMarkUp
        console.log(array)
        return
    } else if (array.length === 1) {
        refs.countriesListEl.innerHTML = countryMarkUp(array[0])
        return
    } else {
        return
    }
}

refs.searchInputEl.addEventListener('input', debounce((event) => (fetchCountries(event.target.value)).then(resolve).then(render).catch(console.log), 500))

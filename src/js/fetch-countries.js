import { alert, defaultModules } from '../../node_modules/@pnotify/core/dist/PNotify.js';
import * as PNotifyMobile from '../../node_modules/@pnotify/mobile/dist/PNotifyMobile.js';

defaultModules.set(PNotifyMobile, {});

export default function fetchCountries(name) {
    return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
        if (response.ok) {
            return response.json()
        }
        
        alert({
            text: 'Введите в строку название страны, которую необходимо найти',
        })
    })
}







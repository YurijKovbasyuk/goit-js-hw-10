import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import debounce from 'lodash.debounce';
import fetchCountries from './fetchcountries';

const DEBOUNCE_DELAY = 300;
const searchBox = document.querySelector('#search-box');
const countrysList = document.querySelector('.country-list');
const list = document.querySelector('.country-info');
const URL = 'https://restcountries.com/v3.1/name/';
const OPTIONS = '?fields=name,capital,population,flags,languages';

searchBox.addEventListener('input', debounce(search, DEBOUNCE_DELAY));

function search(e) {
  const name = e.target.value.trim();
  console.log(name);
  if (!name) {
    return;
  }
  fetchCountries(name)
    .then(countrys => {
      // throw new Error('Ошибка!');
      if (countrys.length > 18) {
        clearCountysList();
        Notify.info('Too many matches found. Please enter a more specific name.');
      } else if (countrys.length > 1) {
        clearCountysInfo();
        markUpCountysList(countrys);
      } else if (countrys.length === 1) {
        clearCountysList();
        markUpCountryInfo(countrys);
      }
    })
    .catch(error => {
      // console.log(error.message);
      Notify.failure('❌ Oops, there is no country with that name');
    });
}

function markUpCountysList(countrys) {
  const countryList = countrys
    .map(
      country =>
        ` <li class="country-list-item">
        <img src="${country.flags.svg}" alt="Country flag">
        <h2 class="country-list-name">${country.name.common}</h2>
    </li>`,
    )
    .join('');
  countrysList.innerHTML = countryList;
}
function clearCountysList() {
  const countryList = '';
  countrysList.innerHTML = countryList;
}
function clearCountysInfo() {
  const countryPropertys = '';
  list.innerHTML = countryPropertys;
}
function markUpCountryInfo(countrys) {
  const countryPropertys = countrys
    .map(
      country =>
        ` <div class="country-info_title">
        <img src="${country.flags.svg}" alt="Country flag">
        <h1 class="country-info_name">${country.name.official}</h1>
    </div>
    <ul class="country-info_list">
        <li name="capital">Capital: ${country.capital}</li>
        <li name="population">Population: ${country.population}</li>
        <li name="languages">Languages: ${Object.values(country.languages)}</li>
    </ul>`,
    )
    .join('');
  list.innerHTML = countryPropertys;
}

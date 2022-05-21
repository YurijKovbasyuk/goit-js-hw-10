// import { Notify } from 'notiflix/build/notiflix-notify-aio';
const URL = 'https://restcountries.com/v3.1/name/';
const OPTIONS = '?fields=name,capital,population,flags,languages';

// function fetchCountries(name) {
//   return fetch(`${URL}${name}${OPTIONS}`)
//     .then(response => {
//       return response.json();
//     })
//     .then(countrys => {
//       if (countrys.length > 18) {
//         Notify.info('Too many matches found. Please enter a more specific name.');
//       } else if (countrys.length > 1) {
//         clearCountysList();
//         markUpCountysList(countrys);
//       } else if (countrys.length === 1) {
//         clearCountysList();
//         markUpCountryInfo(countrys);
//       }
//     })
//     .catch(error => {
//       Notify.failure('❌ такой страны нет');
//     });
// }

function fetchCountries(name) {
  return fetch(`${URL}${name}${OPTIONS}`).then(response => {
    if (response.status !== 200) {
      throw new Error(response.status);
    }
    return response.json();
  });
}
export default fetchCountries;

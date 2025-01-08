const countryName = new URLSearchParams(window.location.search).get('name')
//console.log(countryName);
const flagImage = document.querySelector('.country-details img')
const countryNameH1 = document.querySelector('.country-details h1')
const nativeName = document.querySelector('.native-name')
const population = document.querySelector('.population')
const region = document.querySelector('.region')
const subRegion = document.querySelector('.sub-region')
const capital = document.querySelector('.capital')
const ToplevelDomain = document.querySelector('.top-level-domain')
const Currencies = document.querySelector('.currencies')
const Languages = document.querySelector('.languages')
const borderCountries = document.querySelector('.border-countries')

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
.then((res)=>res.json())
.then(([country])=>{
//console.log(country.borders)
flagImage.src = country.flags.svg
countryNameH1.innerText = country.name.common

if(country.name.nativeName)
nativeName.innerText = Object.values(country.name.nativeName)[0].common
else nativeName.innerText = country.name.common

population.innerText = country.population.toLocaleString('en-IN')
region.innerText = country.region
subRegion.innerText = country.subregion
capital.innerText = country.capital
ToplevelDomain.innerText = country.tld.join(', ')

if(country.currencies)
Currencies.innerText = Object.values(country.currencies)[0].name

else Currencies.innerText = 'NA'

Languages.innerText = Object.values(country.languages)[0]

if(country.borders){

    country.borders.forEach((border) => {
        //console.log(border);
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
        .then((res)=>res.json())
        .then(([borderCountry])=>{
            //console.log(borderCountry)
            const borderCountryTag = document.createElement('a')
            borderCountryTag.innerText = borderCountry.name.common
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
            //console.log(borderCountryTag);
            borderCountries.append(borderCountryTag)

    })
    })
}
}
)

const darkModeButton = document.querySelector('.title-content p');
const body = document.body;

if (localStorage.getItem('theme') === 'dark') {
    body.classList.add('dark-mode');
}

darkModeButton.addEventListener('click', () => {
    body.classList.toggle('dark-mode');

    if (body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

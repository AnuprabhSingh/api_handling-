const countryName = new URLSearchParams(window.location.search).get('name')
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
            fetch(`https://restcountries.com/v3.1/alpha/${border}`)
            .then((res)=>res.json())
            .then(([borderCountry])=>{
                const borderCountryTag = document.createElement('a')
                borderCountryTag.innerText = borderCountry.name.common
                borderCountryTag.href = `country.html?name=${borderCountry.name.common}`
                borderCountries.append(borderCountryTag)
            })
        })
    }
})

// Toggle Dark Mode
const darkModeToggle = document.getElementById('dark-mode-toggle');

// Check if Dark Mode preference is saved
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
    document.body.classList.add('dark-mode');
} else {
    document.body.classList.remove('dark-mode');
}

// Add event listener to toggle dark mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    // Save the theme preference
    if (document.body.classList.contains('dark-mode')) {
        localStorage.setItem('theme', 'dark');
    } else {
        localStorage.setItem('theme', 'light');
    }
});

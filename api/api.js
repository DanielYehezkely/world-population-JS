export const COUNTRIES_URL = 'https://restcountries.com/v3.1/all';

export default class HandleApi {
  constructor(countriesUrl) {
    this.countriesUrl = countriesUrl;
  }

  async fetchCountries(region) {
    try {
      const response = await fetch(this.countriesUrl);
      if (!response.ok) {
        console.error('Error fetching countries');
        return;
      }
      const countriesData = await response.json();
      const countries = countriesData.filter(country => country.region === region);
      this.renderCountries(countries);
    } catch (error) {
      console.error('Error:', error);
    }
  }

  renderCountries(countries) {
    const countriesContainer = document.getElementById('countries-container');
    if (!countriesContainer) {
      console.error('Countries container not found');
      return;
    }
    countriesContainer.innerHTML = ''; 
    countries.forEach(country => {
      const countryEL = document.createElement('button');
      countryEL.className = 'btn';
      countryEL.textContent = country.name.common;
      countriesContainer.appendChild(countryEL);
    });
  }
}
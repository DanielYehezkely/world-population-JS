import { COUNTRIES_URL } from "../models/api.js";

export const fetchCountries = async () => {
  try{
    const response = await fetch(COUNTRIES_URL);
    if (!response.ok) {
      console.log('error');
    }
    const countriesData = await response.json();
    const countries = countriesData.filter(country => country.region === 'Europe');
    const countriesContainer = document.getElementById('countries-container');
    countries.forEach(country => {
      const countryEL = document.createElement('button');
      countryEL.className = 'btn';
      countryEL.textContent = country.name.common;
      countriesContainer.appendChild(countryEL);
    })

  } catch(error) {
    console.log(error);
  }
}
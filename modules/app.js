import HandleApi from "../api/api.js";
import { COUNTRIES_URL, CITIES_URL } from "../models/constants.js";
import ChartHandler from "../modules/chart.js";

export default class App {
  constructor() {
    this.continentButtons = document.querySelectorAll('.continent-button');
    this.handleApi = new HandleApi(COUNTRIES_URL,CITIES_URL);
    this.chartHandler = new ChartHandler(); 
  }

  async handleContinentClick() {
    try {
      this.continentButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const region = event.target.dataset.name;
          const countries = await this.handleApi.fetchCountries(region);
          this.renderCountries(countries);
          this.chartHandler.showChart(); 
        });
      });
    } catch (error) {
      console.error('Error starting the app:', error);
    }
  }
  async handleCountryClick() {
    try {
     
    } catch (error) {
      console.error('Error starting the app:', error);
    }
  }

  renderCountries(countries) {
    const countriesContainer = document.getElementById('countries-container');
    if (!countriesContainer) {
      console.error('Countries container not found');
      return;
    }
    countriesContainer.innerHTML = '';
    const countryNames = [];
    const populations = [];
    const neighbors = [];
    countries.forEach(country => {
      const countryEL = document.createElement('button');
      countryEL.className = 'btn';
      countryEL.textContent = country.name.common;
      countriesContainer.appendChild(countryEL);
      countryNames.push(country.name.common);
      populations.push(country.population || 0);
      neighbors.push(country.borders ? country.borders.length : 0);
    });
    this.chartHandler.updateChart(countryNames, populations, neighbors);
  }
}

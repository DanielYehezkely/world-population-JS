import { COUNTRIES_URL, CITIES_URL } from "../models/constants.js";
import ApiHandler from "../api/api.js";
import ChartHandler from "../modules/chart.js";
import ErrorHandler from "../modules/error.js";
import Loader from "../modules/loader.js"; 

export default class App {
  constructor() {
    this.continentButtons = document.querySelectorAll('.continent-button');
    this.continentsContainer = document.getElementById('continents-container');
    this.chartContainer = document.getElementById('chart-container')
    this.countriesContainer = document.getElementById('countries-container');
    this.apiHandler = new ApiHandler(COUNTRIES_URL, CITIES_URL);
    this.errorHandler = new ErrorHandler();
    this.loader = new Loader(this.continentsContainer, this.chartContainer, this.countriesContainer ); 
    this.chartHandler = new ChartHandler();
  }

  handleContinentClick() {
    this.continentButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        try {
          const region = event.target.dataset.name;
          this.loader.showLoader(); 
          const countries = await this.apiHandler.fetchCountries(region);
          this.renderCountries(countries);
          this.chartHandler.showChart();
        } catch (error) {
          this.errorHandler.displayError(error.message);
        } finally {
          this.loader.hideLoader();
        }
      });
    });
  }

  async handleCountryClick() {
    const countryButtons = document.querySelectorAll('#countries-container .btn');
    countryButtons.forEach(button => {
      button.addEventListener('click', async (event) => {
        try {
          const countryName = event.target.textContent.toLowerCase();
          this.loader.showLoader(); 
          const response = await this.apiHandler.fetchCities(countryName);
          if (response && response.data) {
            this.countriesContainer.innerHTML = countryName.toUpperCase();
            const cities = response.data;
            this.processCityData(cities)
          }
        } catch (error) {
          this.errorHandler.displayError(error.message);
        } finally {
          this.loader.hideLoader(); 
        }
      });
    });
  }

  processCityData(cities) {
    const cityNames = cities.map(cityObj => cityObj.city);
    const populationByYear = {};

    cities.forEach(city => {
      city.populationCounts.forEach(populationCount => {
        const year = populationCount.year;
        const population = parseInt(populationCount.value, 10);

        if (!populationByYear[year]) {
          populationByYear[year] = [];
        }
        populationByYear[year].push(population);
      });
    });

    const datasets = Object.keys(populationByYear).map(year => ({
      label: year,
      data: populationByYear[year],
      borderWidth: 1
    }));

    this.chartHandler.updateChartWithCities(cityNames, datasets);
  }

  renderCountries(countries) {
    this.countriesContainer.innerHTML = countries.map(country => `
      <button class="btn">${country.name.common}</button>
    `).join('');
    const countryNames = countries.map(country => country.name.common);
    const populations = countries.map(country => country.population || 0);
    const neighbors = countries.map(country => country.borders ? country.borders.length : 0);

    this.chartHandler.updateChart(countryNames, populations, neighbors);
    this.handleCountryClick();
  }
}
import HandleApi from "../api/api.js";
import { COUNTRIES_URL, CITIES_URL } from "../models/constants.js";
import ChartHandler from "../modules/chart.js";

export default class App {
  constructor() {
    this.continentButtons = document.querySelectorAll('.continent-button');
    this.countriesContainer = document.getElementById('countries-container');
    this.handleApi = new HandleApi(COUNTRIES_URL, CITIES_URL);
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
      const countryButtons = document.querySelectorAll('#countries-container .btn');
      countryButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const countryName = event.target.textContent.toLowerCase();
          const response = await this.handleApi.fetchCities(countryName);
          if (response && response.data) {
            this.countriesContainer.innerHTML = countryName;
            const cities = response.data;
            const cityNames = cities.map(city => city.city);
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
        });
      });
    } catch (error) {
      console.error('Error handling country click:', error);
    }
  }

  renderCountries(countries) {
    if (!this.countriesContainer) {
      console.error('Countries container not found');
      return;
    }

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
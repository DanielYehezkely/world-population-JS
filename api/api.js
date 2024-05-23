export const COUNTRIES_URL = 'https://restcountries.com/v3.1/all';

export default class HandleApi {
  constructor(countriesUrl) {
    this.countriesUrl = countriesUrl;
    this.chart = new Chart(document.getElementById('chart').getContext('2d'), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Population',
          data: [],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.chartContainer = document.getElementById('chart-container');
    this.hideChart(); 
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
      this.showChart(); 
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
    const countryNames = [];
    const populations = [];
    countries.forEach(country => {
      const countryEL = document.createElement('button');
      countryEL.className = 'btn';
      countryEL.textContent = country.name.common;
      countriesContainer.appendChild(countryEL);

      countryNames.push(country.name.common);
      populations.push(country.population || 0); 
    });

    this.chart.data.labels = countryNames;
    this.chart.data.datasets[0].data = populations;
    this.chart.update(); 
  }

  hideChart() {
    this.chartContainer.classList.add('hidden');
  }

  showChart() {
    this.chartContainer.classList.remove('hidden');
  }
}
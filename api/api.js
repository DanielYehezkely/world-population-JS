import ErrorHandler from '../modules/error.js';

export default class ApiHandler {
  constructor(countriesUrl, citiesUrl) {
    this.countriesUrl = countriesUrl;
    this.citiesUrl = citiesUrl;
    this.errorHandler = new ErrorHandler();
  }

  async fetchCountries(region) {
    try {
      const response = await fetch(this.countriesUrl);
      if (!response.ok) {
        this.errorHandler.displayError('Failed to fetch countries');
        return [];
      }
      const countriesData = await response.json();
      return countriesData.filter(country => country.region === region);
    } catch (error) {
      this.errorHandler.displayError(error.message);
      return [];
    }
  }

  async fetchCities(countryName) {
    try {
      const response = await fetch(this.citiesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          "limit": 10,
          "order": "asc",
          "orderBy": "name",
          "country": countryName
        })
      });

      if (!response.ok) {
        this.errorHandler.displayError('Failed to fetch cities');
        return null;
      }

      const data = await response.json();
      return data;
    } catch (error) {
      this.errorHandler.displayError(error.message);
      return null;
    }
  }
}

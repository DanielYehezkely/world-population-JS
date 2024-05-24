
export default class HandleApi {
  constructor(countriesUrl ,citiesUrl) {
    this.countriesUrl = countriesUrl;
    this.citiesUrl = citiesUrl
  }

  async fetchCountries(region) {
    try {
      const response = await fetch(this.countriesUrl);
      if (!response.ok) {
        console.error('Error fetching countries');
        return [];
      }
      const countriesData = await response.json();
      return countriesData.filter(country => country.region === region);
    } catch (error) {
      console.error('Error:', error);
      return [];
    }
  }

  async fetchCities (countryName) {
    try {
      const response = await fetch(this.citiesUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(
          {
            "limit": 10,
            "order": "asc",
            "orderBy": "name",
            "country": countryName
          })
      });

      if (!response.ok) {
        throw new Error('Failed to fetch cities');
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    };
  };
}
import HandleApi from "../api/api.js";
import { COUNTRIES_URL } from "../api/api.js";

export default class App {
  constructor() {
    this.continentButtons = document.querySelectorAll('.continent-button');
    this.handleApi = new HandleApi(COUNTRIES_URL);
  }

  async start() {
    try {
      this.continentButtons.forEach(button => {
        button.addEventListener('click', async (event) => {
          const region = event.target.dataset.name;
          await this.handleApi.fetchCountries(region);
        });
      });
    } catch (error) {
      console.error('Error starting the app:', error);
    }
  }
}


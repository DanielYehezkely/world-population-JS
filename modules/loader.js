export default class Loader {
  constructor(continentContainer,chartContainer , countriesContainer) {
    this.main = document.getElementById('main-page');
    this.chartContainer = chartContainer;
    this.continentContainer = continentContainer;
    this.countriesContainer = countriesContainer;
    this.loaderElement = document.createElement('div')
    this.loaderElement.classList.add('loader');
    this.hideLoader();
    this.main.appendChild(this.loaderElement);
  }

  showLoader() {
    this.loaderElement.style.display = 'block';
    this.chartContainer.classList.add('hidden') 
    this.countriesContainer.classList.add('hidden') 
    this.continentContainer.classList.add('hidden') 
  }

  hideLoader() {
    this.loaderElement.style.display = 'none';
    this.chartContainer.classList.remove('hidden')
    this.countriesContainer.classList.remove('hidden')
    this.continentContainer.classList.remove('hidden') 
  }

  
  
}
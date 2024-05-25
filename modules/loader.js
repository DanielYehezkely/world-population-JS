export default class Loader {
  constructor() {
    this.loaderContainer = document.getElementById('loader-container');
  }

  showLoader() {
    if (this.loaderContainer) {
      this.loaderContainer.style.display = 'block';
    }
  }

  hideLoader() {
    if (this.loaderContainer) {
      this.loaderContainer.style.display = 'none';
    }
  }
}
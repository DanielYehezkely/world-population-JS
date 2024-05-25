export default class Loader {
  constructor(continentsContainer) {
    this.loaderContainer = continentsContainer;
    this.originalClassName = continentsContainer.className;
    this.originalHtml = continentsContainer.innerHTML;
  }

  showLoader() {
    this.loaderContainer.innerHTML = '';
    this.loaderContainer.className = 'loader';
  }

  hideLoader() {
    this.loaderContainer.className = this.originalClassName;
    this.loaderContainer.innerHTML = this.originalHtml;
  }
}
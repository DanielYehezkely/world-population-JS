export default class ErrorHandler {
  constructor() {
    this.errorContainer = document.getElementById('countries-container');
  }

  displayError(errorMessage) {
    if (this.errorContainer) {
      this.errorContainer.innerHTML = `<div class="error-message">${errorMessage}</div>`;
    } else {
      console.error('Error container not found:', errorMessage);
    }
  }
}
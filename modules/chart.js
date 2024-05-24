export default class ChartHandler {
  constructor() {
    this.chartContainer = document.getElementById('chart-container');
    this.chart = new Chart(document.getElementById('chart').getContext('2d'), {
      type: 'line',
      data: {
        labels: [],
        datasets: []
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });
    this.hideChart();
  }

  updateChart(countryNames, populations, neighbors) {
    this.chart.data.labels = countryNames;
    this.chart.data.datasets = [
      {
        label: 'Population',
        data: populations,
        borderWidth: 1
      },
      {
        label: 'Neighbors',
        data: neighbors,
        borderWidth: 1
      }
    ];
    this.chart.update();
  }

  updateChartWithCities(cityNames, datasets) {
    this.chart.data.labels = cityNames;
    this.chart.data.datasets = datasets;
    this.chart.update();
  }

  hideChart() {
    this.chartContainer.classList.add('hidden');
  }

  showChart() {
    this.chartContainer.classList.remove('hidden');
  }
}
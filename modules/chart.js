export default class ChartHandler {
  constructor() {
    this.chartContainer = document.getElementById('chart-container');
    this.chart = new Chart(document.getElementById('chart').getContext('2d'), {
      type: 'line',
      data: {
        labels: [],
        datasets: [{
          label: 'Population',
          data: [],
          borderWidth: 1 
        },
        {
          label: 'Neighbors',
          data: [],
          borderWidth: 1 
        }]
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
    this.chart.data.datasets[0].data = populations;
    this.chart.data.datasets[1].data = neighbors;
    this.chart.update();
  }

  hideChart() {
    this.chartContainer.classList.add('hidden');
  }

  showChart() {
    this.chartContainer.classList.remove('hidden');
  }
}
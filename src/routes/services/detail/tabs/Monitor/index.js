import React from 'react';
import Chart from 'chart.js';
import { ServiceAction } from 'actions';

const logger = console;

const chartConfig = {
  backgroundColor: [
    'rgba(255, 99, 132, 0.2)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
  ],
  borderColor: [
    'rgba(255,99,132,1)',
    'rgba(54, 162, 235, 1)',
    'rgba(255, 206, 86, 1)',
    'rgba(75, 192, 192, 1)',
    'rgba(153, 102, 255, 1)',
    'rgba(255, 159, 64, 1)',
  ],
  borderWidth: 1,
};

const chartOptions = {
  tooltips: {
    mode: 'index',
    intersect: false,
  },
  hover: {
    mode: 'nearest',
    intersect: true,
  },
};

const formatChartData = (arr, callback, positive = true) => {
  const labels = [];
  const data = [];
  if (arr.result && arr.result.length) {
    arr.result.forEach(d => {
      const date = new Date(d[0] * 1000);
      const ts = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const val = positive ? d[1] : 0 - d[1];
      labels.push(ts);
      data.push(val);
    });
    callback(labels, data);
  }
};

class MonitorTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      networkData: null,
    };
  }
  // componentDidMount() {
  //   this.chartNetwork = new Chart(this.refNetwork).Line();
  //   // this.chartCPU = new Chart(this.refCPU, getChartOptions('网络'));
  //   this.chartMemory = new Chart(this.refMemory, getChartOptions('内存'));
  // }
  async focus() {
    const networkData = await ServiceAction.fetchServiceTotalMatricAction(
      'nginx-ingress-controller',
    );
    if (networkData) {
      this.renderChart(networkData);
    } else {
      logger.warn('monitor fetch data failed', networkData);
    }
  }
  renderChart(networkData) {
    formatChartData(networkData.memory, (labels, data) => {
      if (!this.chartMemory) {
        this.chartMemory = new Chart(this.refMemory, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: '内存',
                data,
                ...chartConfig,
              },
            ],
          },
          options: {
            ...chartOptions,
            scales: {
              yAxes: [
                {
                  ticks: {
                    // beginAtZero: true,
                    callback(dataLabel) {
                      return `${Math.round(dataLabel / 1024 / 1024, 2)}M`;
                    },
                  },
                },
              ],
            },
          },
        });
      } else {
        const c = this.chartMemory;
        logger.log('memory', c);
        c.config.data.labels = labels;
        c.config.data.datasets[0].data = data;
        c.update();
      }
    });
    formatChartData(networkData.networkTransmit, (labels, data) => {
      if (!this.chartNetwork) {
        this.chartNetwork = new Chart(this.refNetwork, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: '出网',
                data,
                ...chartConfig,
              },
              {
                label: '入网',
                ...chartConfig,
              },
            ],
          },
          options: chartOptions,
        });
      } else {
        const c = this.chartMemory;
        logger.log('memory', c);
        c.config.data.labels = labels;
        c.config.data.datasets[0].data = data;
        c.update();
      }
    });
    formatChartData(networkData.networkReceive, (labels, data) => {
      const c = this.chartNetwork;
      logger.log('memory', c);
      c.config.data.labels = labels;
      c.config.data.datasets[1].data = data;
      c.update();
    });
    // formatChartData(networkData.networkTransmit, (labels, data) => {
    //   const c = this.chartNetwork;
    //   logger.log('networkTransmit', c);
    //   c.config.data.labels = labels;
    //   c.config.data.datasets[0].data = data;
    //   c.update();
    // });
    // formatChartData(
    //   networkData.networkReceive,
    //   (labels, data) => {
    //     const c = this.chartNetwork;
    //     logger.log('networkTransmit', c);
    //     c.config.data.labels = labels;
    //     c.config.data.datasets[1].data = data;
    //     c.update();
    //   },
    //   false,
    // );
  }
  render() {
    return (
      <div>
        <div className="row">
          <div className="col-md-12">
            <canvas
              ref={ref => {
                this.refNetwork = ref;
              }}
            />
          </div>
          <div className="col-md-12">
            <canvas
              ref={ref => {
                this.refMemory = ref;
              }}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default MonitorTab;

import React from 'react';
import Chart from 'chart.js';
import { ServiceAction } from 'actions';

const logger = console;

const options = {
  type: 'line',
  data: {
    labels: ['0'],
    datasets: [
      {
        label: '内存',
        data: [0],
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
      },
    ],
  },
  options: {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  },
};

const formatChartData = (arr, callback) => {
  const labels = [];
  const data = [];
  arr.forEach(d => {
    const date = new Date(d[0] * 1000);
    const ts = `${date.getMinutes()}:${date.getSeconds()}`;
    const val = d[1];
    labels.push(ts);
    data.push(val);
  });
  callback(labels, data);
};

class MonitorTab extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      networkData: null,
    };
  }
  componentDidMount() {
    this.chartNetwork = new Chart(this.refNetwork, options);
    this.chartCPU = new Chart(this.refCPU, options);
    this.chartMemory = new Chart(this.refMemory, options);
  }
  focus() {
    setTimeout(() => {
      this.renderMemory();
    }, 0);
  }
  async renderMemory() {
    const networkData = await ServiceAction.fetchServiceMemoryMonAction(
      'nginx-ingress-controller',
    );
    const c = this.chartMemory;
    formatChartData(networkData, (labels, data) => {
      logger.log(c);
      c.config.data.labels = labels;
      c.config.data.datasets[0].data = data;
      c.update();
    });
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
        </div>
        <div className="row">
          <div className="col-md-6">
            <canvas
              ref={ref => {
                this.refCPU = ref;
              }}
            />
          </div>
          <div className="col-md-6">
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

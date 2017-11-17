import React from 'react';
import Chart from 'chart.js';
/* eslint-disable */

const options = {
  type: 'bar',
  data: {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: '# of Votes',
        data: [12, 19, 3, 5, 2, 3],
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

class MonitorTab extends React.Component {
  focus() {
    setTimeout(() => {
      this.renderNetwork();
      this.renderCPU();
      this.renderMemory();
    }, 0);
  }
  renderNetwork() {
    new Chart(this.refNetwork, options);
  }
  renderCPU() {
    new Chart(this.refCPU, options);
  }
  renderMemory() {
    new Chart(this.refMemory, options);
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

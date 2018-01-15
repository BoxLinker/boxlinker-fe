import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'antd';
import { API } from '../../../../const';
import bFetch from '../../../../bfetch';

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

const fetchServiceTotalMatricAction = async serviceName => {
  try {
    const res = await bFetch(API.SERVICE.TOTAL_MATRIC(serviceName), {
      params: {
        start: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
        step: '1m',
      },
    });
    return res.results;
  } catch (err) {
    logger.error('fetchServiceMemoryMonAction', err);
  }
  return null;
};

class Comp extends React.Component {
  static displayName = 'MonitorPane';
  static propTypes = {
    svcName: PropTypes.string.isRequired,
  };
  async focus() {
    const networkData = await fetchServiceTotalMatricAction(this.props.svcName);
    if (networkData) {
      this.renderChart(networkData);
    } else {
      logger.warn('monitor fetch data failed', networkData);
    }
  }
  renderChart(networkData) {
    formatChartData(networkData.memory, (labels, data) => {
      if (!this.chartMemory) {
        // eslint-disable-next-line
        this.chartMemory = new Chart(this.memoryRef, {
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
  }
  render() {
    return (
      <Row gutter={16}>
        <Col span={12}>
          <canvas
            ref={ref => {
              this.memoryRef = ref;
            }}
          />
        </Col>
      </Row>
    );
  }
}

export default Comp;

import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Spin } from 'antd';
import { API } from '../../../../const';
import bFetch from '../../../../bfetch';

const logger = console;
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

const formatNetworkData = (iData = {}, callback) => {
  const labels = [];
  const receive = [];
  const transmit = [];
  const { networkReceive, networkTransmit } = iData;
  if (networkReceive && Array.isArray(networkReceive.result)) {
    networkReceive.result.forEach(item => {
      const date = new Date(item[0] * 1000);
      const ts = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      labels.push(ts);
      receive.push((item[1] / 1).toFixed(2));
    });
  }
  if (networkTransmit && Array.isArray(networkTransmit.result)) {
    networkTransmit.result.forEach(item => {
      transmit.push((0 - item[1]).toFixed(2));
    });
  }
  callback(labels, receive, transmit);
};

const formatChartData = (arr, callback) => {
  const labels = [];
  const data = [];
  if (arr.result && arr.result.length) {
    arr.result.forEach(d => {
      const date = new Date(d[0] * 1000);
      const ts = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
      const val = (d[1] / 1024 / 1024).toFixed(2) << 0;
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
  state = {
    loading: false,
  };
  focus() {
    this.setState(
      {
        loading: true,
      },
      async () => {
        const networkData = await fetchServiceTotalMatricAction(
          this.props.svcName,
        );
        this.setState({
          loading: false,
        });
        if (networkData) {
          this.renderChart(networkData);
        } else {
          logger.warn('monitor fetch data failed', networkData);
        }
        this.sid = setTimeout(() => {
          this.focus();
        }, 60 * 1000);
      },
    );
  }
  blur() {
    if (this.sid) {
      clearTimeout(this.sid);
    }
  }
  renderChart(d) {
    formatNetworkData(d, (labels, receive, transmit) => {
      if (!this.chartNetwork) {
        // eslint-disable-next-line
        this.chartNetwork = new Chart(this.networkRef, {
          type: 'line',
          data: {
            labels,
            datasets: [
              {
                label: '出网',
                data: transmit,
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255,99,132,1)'],
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
              },
              {
                label: '入网',
                data: receive,
                backgroundColor: ['rgba(99, 121, 255, 0.2)'],
                borderColor: ['rgba(99, 121, 255,1)'],
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
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
                      return `${Math.abs(dataLabel.toFixed(2))}kb`;
                    },
                  },
                },
              ],
            },
          },
        });
      } else {
        const c = this.chartNetwork;
        c.config.data.labels = labels;
        c.config.data.datasets[0].data = transmit;
        c.config.data.datasets[1].data = receive;
        c.update();
      }
    });
    formatChartData(d.memory, (labels, data) => {
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
                backgroundColor: ['rgba(255, 99, 132, 0.2)'],
                borderColor: ['rgba(255,99,132,1)'],
                borderWidth: 1,
                pointRadius: 0,
                lineTension: 0,
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
                      return `${dataLabel}M`;
                    },
                  },
                },
              ],
            },
          },
        });
      } else {
        const c = this.chartMemory;
        c.config.data.labels = labels;
        c.config.data.datasets[0].data = data;
        c.update();
      }
    });
  }
  render() {
    return (
      <div>
        <div style={{ height: 25, textAlign: 'right' }}>
          {this.state.loading && <Spin />}
        </div>

        <Row gutter={16}>
          <Col span={12}>
            <canvas
              ref={ref => {
                this.networkRef = ref;
              }}
            />
          </Col>
          <Col span={12}>
            <canvas
              ref={ref => {
                this.memoryRef = ref;
              }}
            />
          </Col>
        </Row>
      </div>
    );
  }
}

export default Comp;

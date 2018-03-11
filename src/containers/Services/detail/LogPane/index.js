import React from 'react';
import PropTypes from 'prop-types';
import fetchStream from 'fetch-stream';
import cookies from 'js-cookie';
import { Select } from 'antd';
import moment from 'moment';
import { API } from '../../../../const';
import './style.css';

const logger = console;
const MAX_LEN = 50;
const { Option } = Select;

export default class extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string,
    rowValue: PropTypes.string,
  };
  static defaultProps = {
    rowKey: 'id',
    rowValue: 'value',
  };
  constructor(props) {
    super(props);
    this.state = {
      lines: [],
    };
  }
  fetching = false;
  startTime = '';
  componentWillUnmount() {
    this.stop();
  }
  focus() {
    this.start();
  }
  blur() {
    this.stop();
  }
  parseLogLine(str) {
    if (str === 'eof' || str === 'ping') return;
    try {
      const data = JSON.parse(str);
      if (data.hits && Array.isArray(data.hits.hits)) {
        const hits = data.hits.hits;
        hits.forEach(hit => {
          const source = hit._source;
          const ts = source['@timestamp'];
          this.addLines({
            id: hit._id,
            ts: moment(ts).format('YYYY-MM-DD HH:mm:ss'),
            value: source.log,
          });
        });
        if (hits.length > 0) {
          logger.log('log:>', data);
          this.startTime = hits[hits.length - 1]._source['@timestamp'];
        }
      }
    } catch (e) {}
  }
  fetchLog(containerID) {
    fetchStream(
      {
        url: `${API.SERVICE.LOG(containerID)}?start_time=${this.startTime}`,
        headers: {
          'X-Access-Token': cookies.get('X-Access-Token'),
        },
      },
      (result, err) => {
        if (err) {
          logger.error('fetch err', err);
          return false;
        }
        if (!result || !this.fetching) {
          logger.log('cancel fetch ...');
          return false;
        }
        if (result.done) {
          console.log('completed');
          return;
        }
        const str = String(result.value);
        switch (str) {
          case 'eof':
            this.start();
            return false;
          case 'ping':
            return true;
          default:
            this.parseLogLine(str);
        }
        return true; // return false to cancel
      },
    );
  }
  getContainerID() {
    const { svcDetail } = this.props;
    if (!svcDetail) {
      console.error('LogPane:> no svcDetail');
      return '';
    }
    logger.log('start fetch log');
    const { pods } = svcDetail;
    if (!pods || pods.length !== 1) {
      console.error('LogPane:> no svcDetail.pods');
      return '';
    }
    const pod = pods[0];
    if (!pod.container_id) {
      console.error('LogPane:> mutilple svcDetail.pods');
      return '';
    }
    if (pod.container_id.startsWith('docker://')) {
      return pod.container_id.substring('docker://'.length);
    }
    return pod.container_id;
  }
  start(cid) {
    if (!cid) {
      cid = this.getContainerID();
    }
    this.fetching = true;
    this.logFetcher = this.fetchLog(cid);
  }
  stop() {
    this.fetching = false;
    logger.log('log stop');
    this.setState({
      lines: [],
    });
    if (!this.logFetcher) {
      return;
    }
    logger.log('logFetcher abort');
    this.logFetcher.cancel();
    this.logFetcher = null;
  }
  moreLog = (ts, text) => {
    const arr = text.split('\n');
    if (arr[arr.length - 1] === '') {
      arr.pop();
    }
    this.addLines(
      arr.map(t => ({
        value: t,
      })),
    );
  };
  addLines(lines) {
    if (!lines) {
      return;
    }
    if (!Array.isArray(lines)) {
      this.addLines([lines]);
      return;
    }
    let arr = [].concat(this.state.lines).concat(lines);
    if (arr.length > MAX_LEN) {
      arr = arr.slice(arr.length - MAX_LEN);
    }
    this.setState(
      {
        lines: arr,
      },
      () => {
        if (this.logPanelRef) {
          this.logPanelRef.scrollTop = 10000000;
        }
      },
    );
  }
  getLogs() {
    const { rowKey, rowValue } = this.props;
    const { lines } = this.state;
    return (
      <div
        ref={ref => {
          this.logPanelRef = ref;
        }}
        style={{
          backgroundColor: '#000',
          color: '#fff',
          maxHeight: '500px',
          overflow: 'auto',
        }}
      >
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {!lines || !lines.length ? (
            <li className="log-item">加载中...</li>
          ) : (
            lines.map((line, k) => (
              <li className="log-item" key={line[rowKey] + k}>
                <span className="log-item-ts">{line.ts}</span>
                {line[rowValue]}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  }
  getPodsSelect() {
    const { svcDetail } = this.props;
    const { pods } = svcDetail;
    if (!pods || !pods.length) {
      return null;
    }
    const defaultPodName = pods[0].name;
    return (
      <div style={{ marginBottom: 15 }}>
        <span style={{ margin: '0 15px 0 0' }}>Pod</span>
        <Select defaultValue={defaultPodName} style={{ width: 240 }}>
          {pods.map(pod => (
            <Option key={pod.container_id} value={pod.container_id}>
              {pod.name}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
  render() {
    return (
      <div>
        {this.getPodsSelect()}
        {this.getLogs()}
      </div>
    );
  }
}

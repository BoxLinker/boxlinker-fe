import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { API, BaseURL } from '../../../../const';
import './style.css';

const logger = console;
const MAX_LEN = 50;
class FetchLog {
  constructor(options) {
    this.xhr = new XMLHttpRequest();
    this.init(options);
  }
  isAbort = false;
  total = 0;
  init({ containerID, onProgress, onError, onTimeout, timeout }) {
    const xhr = this.xhr;
    xhr.open('GET', `${BaseURL}${API.SERVICE.LOG(containerID)}`, true);
    xhr.timeout = timeout || 30000;
    xhr.setRequestHeader('X-Access-Token', cookie.get('X-Access-Token'));
    xhr.onload = e => {
      logger.log('onload', e.target.responseText);
    };
    xhr.ontimeout = () => {
      if (this.isAbort) {
        return;
      }
      onTimeout();
    };
    xhr.onprogress = ({ target: { responseText } }) => {
      if (this.isAbort) {
        return;
      }
      if (!responseText || responseText === '') {
        return;
      }
      onProgress(responseText.substring(this.total));
      this.total = responseText.length;
      console.log('this.total', this.total);
    };
    xhr.onerror = ({ target: { status, statusText } }) => {
      if (this.isAbort) {
        return;
      }
      logger.log('onerror', status, statusText);
      onError(status, statusText);
    };
    this.isAbort = false;
    xhr.send(null);
  }
  abort() {
    if (!this.xhr && !this.isAbort) {
      this.xhr.abort();
    }
    this.xhr = null;
    this.isAbort = true;
  }
}

const fetchServicePodLog = options => new FetchLog(options);

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
  componentWillUnmount() {
    this.stop();
  }
  start() {
    const { svcDetail } = this.props;
    if (!svcDetail) {
      console.error('LogPane:> no svcDetail');
      return;
    }
    logger.log('start fetch log');
    const { pods } = svcDetail;
    if (!pods || pods.length !== 1) {
      console.error('LogPane:> no svcDetail.pods');
      return;
    }
    const pod = pods[0];
    if (!pod.container_id) {
      console.error('LogPane:> mutilple svcDetail.pods');
      return;
    }
    let cid = pod.container_id;
    if (pod.container_id.startsWith('docker://')) {
      cid = pod.container_id.substring('docker://'.length);
    }
    const self = this;
    this.logFetcher = fetchServicePodLog({
      containerID: cid,
      onProgress: this.moreLog,
      onTimeout() {
        logger.warn('fetch log timeout');
        self.start();
      },
      onError(status, statusText) {
        logger.error('fetch log error', status, statusText);
        self.start();
      },
      timeout: 30000,
    });
  }
  stop() {
    this.setState({
      lines: [],
    });
    if (!this.logFetcher) {
      return;
    }
    logger.log('logFetcher abort');
    this.logFetcher.abort();
    this.logFetcher = null;
  }
  moreLog = text => {
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
    console.log('lines', lines);
    let arr = [].concat(this.state.lines).concat(lines);
    if (arr.length > MAX_LEN) {
      arr = arr.slice(arr.length - MAX_LEN);
    }
    this.setState({
      lines: arr,
    });
  }
  render() {
    const { rowKey, rowValue } = this.props;
    const { lines } = this.state;
    return (
      <div
        style={{
          backgroundColor: '#000',
          color: '#fff',
          maxHeight: '500px',
          overflow: 'auto',
        }}
      >
        <ul style={{ margin: 0, padding: 0, listStyle: 'none' }}>
          {lines.map((line, k) => (
            <li className="log-item" key={line[rowKey] || k}>
              {line[rowValue]}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { API, BaseURL } from '../../../const';

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
    logger.log('start fetch log');
    const self = this;
    this.logFetcher = fetchServicePodLog({
      containerID:
        '17af5da76bc1c863d45696a6c3e5c250329ee8a3fa17cd5bb401800b2e4a4350',
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
      <ul>
        {lines.map((line, k) => (
          <li key={line[rowKey] || k}>{line[rowValue]}</li>
        ))}
      </ul>
    );
  }
}

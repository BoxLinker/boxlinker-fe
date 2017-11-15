/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import bFetch, { BaseURL } from 'bfetch';
import Cookies from 'universal-cookie';
import { API } from '../constants';

const logger = console;
const log = console.log; //eslint-disable-line

export const runtime = createAction('SET_RUNTIME_VARIABLE', (name, value) => ({
  name,
  value,
}));

export const userinfo = createAction('GET_USERINFO', async token => {
  try {
    const data = await bFetch(API.USERINFO, { token });
    return data.results;
  } catch (err) {
    return null;
  }
});

export const getServices = createAction('GET_SERVICES', async pagination => {
  try {
    const data = await bFetch(API.SERVICE.QUERY, { pagination });
    return data.results;
  } catch (err) {
    return null;
  }
});

export const getServiceDetail = createAction(
  'GET_SERVICE_DETAIL',
  async name => {
    try {
      const data = await bFetch(API.SERVICE.GET(name));
      return data.results;
    } catch (err) {
      return null;
    }
  },
);

export const getServicePodLog = async (containerID, callback) => {
  try {
    const response = await bFetch(API.SERVICE.LOG(containerID), {
      rawResponse: true,
    });
    const reader = response.body.getReader();
    // The following function handles each data chunk
    const push = () =>
      // "done" is a Boolean and value a "Uint8Array"
      reader
        .read()
        .then(({ done, value }) => {
          // Is there no more data to read?
          if (done) {
            // Tell the browser that we have finished sending data
            return;
          }
          callback(new TextDecoder('utf-8').decode(value));
          // Get the data and send it to the browser via the controller
        })
        .then(push);
    push();
  } catch (err) {
    console.error(err);
  }
};

const cookie = new Cookies();
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

export const fetchServicePodLog = options => new FetchLog(options);

/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import bFetch from 'bfetch';
import { API } from '../constants';

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

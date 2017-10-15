/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import bFetch from 'bfetch';
import { API } from '../constants';

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

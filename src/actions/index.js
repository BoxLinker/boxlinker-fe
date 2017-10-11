/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import { API } from '../constants';

export const runtime = createAction('SET_RUNTIME_VARIABLE', (name, value) => ({
  name,
  value,
}));

export const userinfo = createAction('GET_USERINFO', async fetch => {
  const data = await fetch(API.USERINFO, { method: 'GET' });
  if (data.status === 0) {
    return data.results;
  }
  return null;
});

export const getServices = createAction('GET_SERVICES', async fetch => {
  const data = await fetch(API.SERVICE.QUERY, { method: 'GET' });
  if (data.status === 0) {
    return data.results;
  }
  return {};
});

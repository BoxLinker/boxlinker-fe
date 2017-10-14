/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import bFetch from 'bfetch';
import { API } from '../constants';

export const runtime = createAction('SET_RUNTIME_VARIABLE', (name, value) => ({
  name,
  value,
}));

export const userinfo1 = createAction('GET_USERINFO1', async fetch => {
  const data = await fetch(API.USERINFO, { method: 'GET' });
  if (data.status === 0) {
    return data.results;
  }
  return null;
});

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

export const getServices1 = createAction(
  'GET_SERVICES1',
  async (fetch, pagination) => {
    let page = pagination;
    if (!pagination) {
      page = {
        currentPage: 1,
        pageCount: 10,
      };
    }
    const { currentPage, pageCount } = page;
    const data = await fetch(
      `${API.SERVICE.QUERY}?currentPage=${currentPage}&pageCount=${pageCount}`,
      {
        method: 'GET',
      },
    );
    if (data.status === 0) {
      return data.results;
    }
    return {};
  },
);

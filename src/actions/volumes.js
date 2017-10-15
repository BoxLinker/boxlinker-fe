/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import bFetch from 'bfetch';
import { API } from '../constants';

export const getVolumes = createAction('GET_VOLUMES', async pagination => {
  try {
    const data = await bFetch(API.VOLUMES.QUERY, { pagination });
    return data.results;
  } catch (err) {
    return null;
  }
});
/* eslint-disable no-console */
export const createVolume = createAction('CREATE_VOLUME', async form => {
  try {
    const data = await bFetch(API.VOLUMES.QUERY, {
      method: 'POST',
      body: JSON.stringify(form),
    });
    console.log('create success', data);
  } catch (err) {
    console.log('create failed', err);
  }
});

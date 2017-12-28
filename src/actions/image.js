/* eslint-disable import/prefer-default-export */
import { createAction } from 'redux-actions';
import bFetch from 'bfetch';
import { API } from 'const';

export const getImages = createAction('GET_IMAGES', async pagination => {
  try {
    const data = await bFetch(API.IMAGES.QUERY, { pagination });
    return data.results;
  } catch (err) {
    return null;
  }
});

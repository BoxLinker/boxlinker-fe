/* eslint-disable import/prefer-default-export */

import { ACTION_RECEIVE_IMAGE } from '../constants';

export function receiveImages({ results }) {
  return {
    type: ACTION_RECEIVE_IMAGE,
    payload: {
      results,
    },
  };
}

export function searchImages() {
  return dispatch => {
    setTimeout(() => {
      dispatch(
        receiveImages({
          results: [
            {
              label: '111',
              value: '111v',
            },
            {
              label: '222',
              value: '222v',
            },
            {
              label: '333',
              value: '333v',
            },
            {
              label: '444',
              value: '444v',
            },
          ],
        }),
      );
    }, 1000);
  };
}

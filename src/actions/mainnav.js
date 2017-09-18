/* eslint-disable import/prefer-default-export */

import { ACTION_CLICK_MAINNAV } from '../constants';

export function locationChange() {
  return {
    type: ACTION_CLICK_MAINNAV,
    payload: {},
  };
}

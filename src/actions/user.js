import { ACTION_USERINFO, API } from 'const';
import bFetch from 'bfetch';

export function getUserInfo() {
  return dispatch => {
    try {
      const res = bFetch(API.USER.USERINFO, { method: 'GET' });
      dispatch({
        type: ACTION_USERINFO,
        payload: res.results,
      });
    } catch (e) {
      dispatch({
        type: ACTION_USERINFO,
        payload: null,
      });
    }
  };
}

export default getUserInfo;

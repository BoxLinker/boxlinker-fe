import { ACTION_USERINFO, URL_USERINFO } from 'const';

export function getUserInfo(fetch) {
  return dispatch =>
    fetch(URL_USERINFO, { method: 'GET' }).then(json => {
      dispatch({
        type: ACTION_USERINFO,
        payload: json.results,
      });
    });
}

export default getUserInfo;

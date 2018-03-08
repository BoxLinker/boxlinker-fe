import cookie from 'js-cookie';
import { createAction } from 'redux-actions';
import bFetch from '../bfetch';
import { API } from '../const';

const logger = console;

export const login = async data => {
  try {
    const res = await bFetch(API.USER.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    const token = res.results['X-Access-Token'];
    if (token) {
      const { hostname } = window.location;
      cookie.set('X-Access-Token', token, {
        domain: hostname !== 'localhost' ? '.boxlinker.com' : 'localhost',
      });
    }
  } catch (err) {
    throw err;
  }
};

export const reg = async data => {
  try {
    await bFetch(API.USER.REG, {
      method: 'POST',
      body: JSON.stringify(data),
    });
  } catch (err) {
    throw err;
  }
};

export const forgotAction = async data => {
  try {
    await bFetch(API.USER.SEND_RESET_PASS_EMAIL, {
      method: 'post',
      body: JSON.stringify(data),
    });
  } catch (err) {
    throw err;
  }
};

export const resetPassAction = async (token, data) => {
  try {
    await bFetch(API.USER.RESET_PASS, {
      method: 'post',
      body: JSON.stringify(data),
      headers: {
        'X-Access-Token': token,
      },
    });
  } catch (err) {
    throw err;
  }
};

export const logoutAction = () => {
  cookie.remove('X-Access-Token');
  window.location.href = '/login';
};

export const getUserInfoAction = createAction('GET_USERINFO', async () => {
  try {
    const res = await bFetch(API.USER.USERINFO, {
      method: 'get',
    });
    return res.results;
  } catch (err) {
    logger.error('Get UserInfo', {
      err,
    });
    // logoutAction();
  }
  return null;
});

export default {};

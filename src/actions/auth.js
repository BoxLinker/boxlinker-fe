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
  }
  return null;
});

export default {};

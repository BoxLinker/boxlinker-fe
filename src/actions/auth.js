import cookie from 'js-cookie';
import bFetch from '../bfetch';
import { API } from '../const';

const login1 = data =>
  new Promise((resolve, reject) => {
    bFetch(API.USER.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    })
      .then(res => {
        const token = res.results['X-Access-Token'];
        if (token) {
          const { hostname } = window.location;
          cookie.set('X-Access-Token', token, {
            domain: hostname !== 'localhost' ? '.boxlinker.com' : 'localhost',
          });
          resolve();
        } else {
          reject();
        }
      })
      .catch(() => {
        reject();
      });
  });

const login = async data => {
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

export { login };

export default {};

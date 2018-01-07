import bFetch from '../bfetch';
import { API } from '../const';

export default {};
export const getServices = params =>
  new Promise((resolve, reject) => {
    bFetch(API.SERVICE.QUERY, {
      params,
    })
      .then(res => {
        console.log(res);
        resolve(res.results);
      })
      .catch(e => {
        console.log('getServices err: ', e);
        reject(e);
      });
  });

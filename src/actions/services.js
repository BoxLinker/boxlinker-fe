import bFetch from 'bfetch';
import { API } from '../constants';

const logger = console;

const fetchServiceMemoryMonAction = async serviceName => {
  try {
    const res = await bFetch(API.SERVICE.MON_MEMORY(serviceName), {
      params: {
        start: '2017-11-17T09:37:10.495Z',
        end: '2017-11-17T09:42:10.495Z',
      },
    });
    return res.results;
  } catch (err) {
    logger.error('fetchServiceMemoryMonAction', err);
  }
  return null;
};

const fetchServiceTotalMatricAction = async serviceName => {
  try {
    const res = await bFetch(API.SERVICE.TOTAL_MATRIC(serviceName), {
      params: {
        start: new Date(Date.now() - 60 * 60 * 1000).toISOString(),
        end: new Date().toISOString(),
        step: '1m',
      },
    });
    return res.results;
  } catch (err) {
    logger.error('fetchServiceMemoryMonAction', err);
  }
  return null;
};

export default {
  fetchServiceTotalMatricAction,
  fetchServiceMemoryMonAction,
};

/* eslint-disable import/prefer-default-export */

const isNode =
  Object.prototype.toString.call(
    typeof process !== 'undefined' ? process : 0,
  ) === '[object process]';

export const SET_RUNTIME_VARIABLE = 'SET_RUNTIME_VARIABLE';

export const ACTION_SEARCH_IMAGE = 'ACTION_SEARCH_IMAGE';
export const ACTION_RECEIVE_IMAGE = 'ACTION_RECEIVE_IMAGE';
export const ACTION_CLICK_MAINNAV = 'ACTION_CLICK_MAINNAV';
export const ACTION_USERINFO = 'ACTION_USERINFO';
export const TOKEN_NAME = 'X-Access-Token';

export const URL_SEARCH_IMAGE = '/v1/registry/pub/image/list';
export const URL_USERINFO = '/v1/user/account/userinfo';
export const API = {
  SERVICE: {
    CREATE: '/v1/application/auth/service',
    QUERY: '/v1/application/auth/service',
    GET: name => `/v1/application/auth/service/${name}`,
    UPDATE: name => `/v1/application/auth/service/${name}`,
    DELETE: name => `/v1/application/auth/service/${name}`,
    EXISTS: name => `/v1/application/auth/service/${name}/exists`,
    LOG: containerID => `/v1/application/auth/log/${containerID}`,
    MON_MEMORY: name => `/v1/application/auth/monitor/${name}`,
  },
  IMAGES: {
    QUERY: '/v1/registry/auth/image/list',
  },
  VOLUMES: {
    QUERY: '/v1/application/auth/volume',
    CREATE: '/v1/application/auth/volume',
  },
  USERINFO: '/v1/user/account/userinfo',
  LOGIN: '/v1/user/auth/login',
};

export function GetEnv(name) {
  return isNode ? process.env[name] : window.App.env[name];
}

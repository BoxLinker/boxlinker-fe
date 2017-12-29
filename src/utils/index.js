/* eslint-disable import/prefer-default-export */
export function getUrlParameter(name) {
  const n = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'); //eslint-disable-line
  const regex = new RegExp(`[\\?&]${n}=([^&#]*)`);
  const results = regex.exec(location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

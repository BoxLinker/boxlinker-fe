export function getUrlParameter(name) {
  const n = name.replace(/[\[]/, '\\[').replace(/[\]]/, '\\]'); //eslint-disable-line
  const regex = new RegExp(`[\\?&]${n}=([^&#]*)`);
  const results = regex.exec(window.location.search);
  return results === null
    ? ''
    : decodeURIComponent(results[1].replace(/\+/g, ' '));
}

export function getDuration(start, end) {
  const sec = end - start;
  return `${Math.floor(sec / 60)} 分 ${sec % 60} 秒`;
}

export default {};

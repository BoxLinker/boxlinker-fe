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

const Minite = 60 * 1000;
const Hour = 60 * Minite;
const Day = 24 * Hour;
const Month = 30 * Day;
const Year = 12 * Month;

export function fromNow(ts) {
  if (`${ts}`.length === 10) {
    ts = ts * 1000;
  }
  const date = new Date(ts);
  const d = new Date().getTime() - date.getTime();
  if (d <= 0) {
    return '刚刚';
  }
  if (d < Minite) {
    return '1 分钟内';
  }
  if (d < Hour) {
    return `${Math.floor(d / Minite)} 分钟以前`;
  }
  if (d < Day) {
    return `${Math.floor(d / Hour)} 小时以前`;
  }
  if (d < Month) {
    return `${Math.floor(d / Day)} 天以前`;
  }
  if (d < Year) {
    return `${Math.floor(d / Month)} 个月以前`;
  }
  return `${Math.floor(d / Year)} 年以前`;
}

export default {};

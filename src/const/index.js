export const BaseURL = 'https://api.boxlinker.com';
export const DEV = process.env.NODE_ENV === 'development';
const DevURL = {
  CICD: 'http://localhost:8083',
  VOLUMES: 'http://localhost:8889',
  IMAGES: 'http://localhost:8889',
  USER: 'https://api.boxlinker.com', //8801
  REGISTRY: 'http://localhost:8889',
  SERVICE: 'http://localhost:8889',
};

export const API = {
  SERVICE: {
    CREATE: getURL('/v1/application/auth/service', 'SERVICE'),
    QUERY: getURL('/v1/application/auth/service', 'SERVICE'),
    GET: name => getURL(`/v1/application/auth/service/${name}`, 'SERVICE'),
    UPDATE: name => getURL(`/v1/application/auth/service/${name}`, 'SERVICE'),
    DELETE: name => getURL(`/v1/application/auth/service/${name}`, 'SERVICE'),
    EXISTS: name =>
      getURL(`/v1/application/auth/service/${name}/exists`, 'SERVICE'),
    LOG: containerID =>
      getURL(`/v1/application/auth/log/${containerID}`, 'SERVICE'),
    MON_MEMORY: name =>
      getURL(`/v1/application/auth/monitor/${name}`, 'SERVICE'),
    TOTAL_MATRIC: name =>
      getURL(`/v1/application/auth/monitor/${name}`, 'SERVICE'),
  },
  IMAGES: {
    QUERY: getURL('/v1/registry/auth/image/list', 'IMAGES'),
    QUERY_PUB: getURL('/v1/registry/pub/image/list', 'IMAGES'),
  },
  VOLUMES: {
    QUERY: getURL('/v1/application/auth/volume', 'VOLUMES'),
    CREATE: getURL('/v1/application/auth/volume', 'VOLUMES'),
  },
  REGISTRY: {
    SEARCH_IMAGE: getURL('/v1/registry/pub/image/list', 'REGISTRY'),
  },
  USER: {
    REG: getURL('/v1/user/auth/reg', 'USER'),
    CHANGE_PASS: getURL('/v1/user/account/changepassword', 'USER'),
    SEND_RESET_PASS_EMAIL: getURL('/v1/user/pub/pass/send_email', 'USER'),
    RESET_PASS: getURL('/v1/user/account/pass_reset', 'USER'),
    USERINFO: getURL('/v1/user/account/userinfo', 'USER'),
    LOGIN: getURL('/v1/user/auth/login', 'USER'),
  },
  CICD: {
    QUERY_BRANCHES: (scm, owner, name) =>
      getURL(`/v1/cicd/${scm}/repos/${owner}/${name}/branches`, 'CICD'),
    QUERY_BUILDS: (scm, owner, name) =>
      getURL(`/v1/cicd/${scm}/repos/${owner}/${name}/builds`, 'CICD'),
    QUERY_BRANCH_BUILDS: (scm, owner, name) =>
      getURL(
        `/v1/cicd/${scm}/repos/${owner}/${name}/query_branch_build`,
        'CICD',
      ),
    PROCS: (scm, owner, name, build_id) =>
      getURL(
        `/v1/cicd/${scm}/repos/${owner}/${name}/procs/${build_id}`,
        'CICD',
      ),
    PROC_LOG: (scm, owner, name, number, pid) =>
      getURL(
        `/v1/cicd/${scm}/repos/${owner}/${name}/logs/${number}/${pid}`,
        'CICD',
      ),
    PROC_STREAM_LOG: (scm, owner, name, number) =>
      getURL(
        `/v1/cicd/${scm}/stream/logs/${owner}/${name}/${number}/1`,
        'CICD',
      ),
    GET_REPO: (scm, owner, name) =>
      getURL(`/v1/cicd/${scm}/repos/${owner}/${name}`, 'CICD'),
    REPOS: scm => getURL(`/v1/cicd/${scm}/user/repos`, 'CICD'),
    POST_REPO: (scm, owner, name) =>
      getURL(`/v1/cicd/${scm}/repos/${owner}/${name}`, 'CICD'),
    GET_BUILD: (scm, owner, name, number) =>
      getURL(`/v1/cicd/${scm}/repos/${owner}/${name}/builds/${number}`, 'CICD'),
    POST_BUILD: (scm, owner, name, number) =>
      getURL(`/v1/cicd/${scm}/repos/${owner}/${name}/builds/${number}`, 'CICD'),
  },
};

function getURL(url, moduler) {
  if (DEV) {
    return `${DevURL[moduler]}${url}`;
  }
  return `${BaseURL}${url}`;
}

export const MemoryConfig = [
  { label: '64M', value: '64Mi' },
  { label: '128M', value: '128Mi' },
  { label: '256M', value: '256Mi' },
  { label: '512M', value: '512Mi' },
];

export const BuildColorMap = {
  success: 'green',
  failure: 'red',
};

export default {};

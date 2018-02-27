export const API = {
  SERVICE: {
    CREATE: '/v1/application/auth/service',
    QUERY: 'http://localhost:8889/v1/application/auth/service',
    GET: name => `http://localhost:8889/v1/application/auth/service/${name}`,
    UPDATE: name => `/v1/application/auth/service/${name}`,
    DELETE: name => `/v1/application/auth/service/${name}`,
    EXISTS: name => `/v1/application/auth/service/${name}/exists`,
    LOG: containerID =>
      `http://localhost:8889/v1/application/auth/log/${containerID}`,
    MON_MEMORY: name => `/v1/application/auth/monitor/${name}`,
    TOTAL_MATRIC: name => `/v1/application/auth/monitor/${name}`,
  },
  IMAGES: {
    QUERY: '/v1/registry/auth/image/list',
    QUERY_PUB: '/v1/registry/pub/image/list',
  },
  VOLUMES: {
    QUERY: '/v1/application/auth/volume',
    CREATE: '/v1/application/auth/volume',
  },
  REGISTRY: {
    SEARCH_IMAGE: '/v1/registry/pub/image/list',
  },
  USER: {
    REG: '/v1/user/auth/reg',
    CHANGE_PASS: '/v1/user/account/changepassword',
    SEND_RESET_PASS_EMAIL: '/v1/user/pub/pass/send_email',
    RESET_PASS: '/v1/user/account/pass_reset',
    USERINFO: '/v1/user/account/userinfo',
    LOGIN: '/v1/user/auth/login',
  },
  CICD: {
    QUERY_BRANCHES: (scm, owner, name) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}/branches`,
    QUERY_BUILDS: (scm, owner, name) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}/builds`,
    QUERY_BRANCH_BUILDS: (scm, owner, name) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}/query_branch_build`,
    PROCS: (scm, owner, name, build_id) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}/procs/${build_id}`,
    PROC_LOG: (scm, owner, name, number, pid) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}/logs/${number}/${pid}`,
    PROC_STREAM_LOG: (scm, owner, name, number) =>
      `http://localhost:8083/v1/cicd/${scm}/stream/logs/${owner}/${name}/${number}/1`,
    GET_REPO: (scm, owner, name) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}`,
    REPOS: scm => `http://localhost:8083/v1/cicd/${scm}/user/repos`,
    GET_BUILD: (scm, owner, name, number) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}/builds/${number}`,
    POST_BUILD: (scm, owner, name, number) =>
      `http://localhost:8083/v1/cicd/${scm}/repos/${owner}/${name}/builds/${number}`,
  },
};

export const BaseURL = 'https://api.boxlinker.com';

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

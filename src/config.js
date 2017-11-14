require('dotenv').config();

const getEnvs = () => {
  const envs = {};
  Object.keys(process.env).forEach(e => {
    if (/^BOXLINKER_/.test(e)) {
      envs[e] = process.env[e];
    }
  });
  return envs;
};
export default getEnvs;

// module.exports = {
//   port: process.env.PORT || 3000,
//   redirect: {
//     loginUrl: process.env.REDIRECT_LOGIN_URL || 'http://localhost:8086',
//   },
//   api: {
//     COOKIE_DOMAIN: process.env.COOKIE_DOMAIN || 'localhost',
//     // API URL to be used in the client-side code
//     clientUrl: process.env.API_CLIENT_URL || `http://localhost:8081`,
//     // API URL to be used in the server-side code
//     serverUrl: process.env.API_SERVER_URL || `http://localhost:8081`,
//   },
// };

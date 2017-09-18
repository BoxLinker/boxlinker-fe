module.exports = {
  port: process.env.PORT || 3000,
  redirect: {
    loginUrl: process.env.REDIRECT_LOGIN_URL || 'http://localhost:8086',
  },
  api: {
    // API URL to be used in the client-side code
    clientUrl: process.env.API_CLIENT_URL || `http://localhost:8081`,
    // API URL to be used in the server-side code
    serverUrl: process.env.API_SERVER_URL || `http://localhost:8081`,
  },
};

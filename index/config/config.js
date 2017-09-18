(function($, doc, win) {
  if (typeof boxlinker === 'undefined') {
    window.boxlinker = {};
  }

  const prefix = 'http://localhost:8081';
  const consoleURL = 'http://localhost:3000';
  boxlinker.settings = {
    api: {
      login: `${prefix}/v1/user/auth/login`,
      reg: `${prefix}/v1/user/auth/reg`,
      userinfo: `${prefix}/v1/user/account/userinfo`,
    },
    cookieDomain: 'localhost',
    directURL: {
      consoleURL,
    },
  };
})(jQuery, document, window);

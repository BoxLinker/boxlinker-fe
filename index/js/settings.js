(function($, doc, win) {
  if (typeof boxlinker === 'undefined') {
    window.boxlinker = {};
  }

  const prefix = 'https://api.boxlinker.com';
  const consoleURL = 'https://console.boxlinker.com';
  boxlinker.settings = {
    api: {
      login: `${prefix}/v1/user/auth/login`,
      reg: `${prefix}/v1/user/auth/reg`,
      userinfo: `${prefix}/v1/user/account/userinfo`,
    },
    directURL: {
      consoleURL,
    },
  };
})(jQuery, document, window);

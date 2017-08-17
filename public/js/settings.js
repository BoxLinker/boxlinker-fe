(function ($, doc, win) {
  if (typeof boxlinker == 'undefined') {
    window.boxlinker = {}
  }

  var prefix = 'http://localhost:8080'
  var consoleURL = 'login.html'
  boxlinker.settings = {
    api:{
      login:  prefix + '/v1/user/auth/login',
      reg:    prefix + '/v1/user/auth/reg',
      userinfo:    prefix + '/v1/user/account/userinfo',
    },
    directURL:{
      consoleURL: consoleURL
    }
  }
})(jQuery, document, window);
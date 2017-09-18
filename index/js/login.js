(function($, doc, win) {
  var TOKEN_KEY = 'X-Access-Token';
  var Form = boxlinker.Form;
  var FormElement = boxlinker.FormElement;

  var $form = $('#login-form');
  var $name = $form.find('input[name=name]');
  var $nameAlert = $name.siblings('.form-alert-tip');
  var $pass = $form.find('input[name=password]');
  var $passAlert = $pass.siblings('.form-alert-tip');

  var nameEle = new FormElement({
    $el: $name,
    $elMsg: $nameAlert,
    rules: ['required'],
    getValue() {
      return $name.val();
    },
  });

  var passEle = new FormElement({
    $el: $pass,
    $elMsg: $passAlert,
    rules: ['required'],
    getValue() {
      return $pass.val();
    },
  });
  var $alert = $('#alert-login-failed');
  var $alertSpan = $alert.find('span.status-text');
  function alertTip(text,cls){
    $alertSpan.text(text);
    $alert.removeClass('alert-danger alert-success').addClass(cls).show();
  }
  new Form({
    $el: $form,
    elements: [nameEle, passEle],
    onSubmit() {
      var data = {
        username: $name.val(),
        password: $pass.val(),
      };
      $alert.hide();

      console.log('form data:> ', data);

      $.ajax({
        type: 'POST',
        url: boxlinker.settings.api.login,
        data: JSON.stringify(data),
        dataType: 'json',
        success(ret) {
          switch (ret.status) {
            case 0: // ok
              $.cookie(TOKEN_KEY, ret.results[TOKEN_KEY], { domain: boxlinker.settings.cookieDomain });
              location.href = boxlinker.settings.directURL.consoleURL;
              break;
            default:
              alertTip('用户名或密码错误', 'alert-danger');
              break;
          }
        },
        error() {},
      });
    },
  });
  function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
  }
  var base64EncodeChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
  var base64DecodeChars = new Array(
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1,
    -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, -1, 62, -1, -1, -1, 63,
    52, 53, 54, 55, 56, 57, 58, 59, 60, 61, -1, -1, -1, -1, -1, -1,
    -1,　0,　1,　2,　3,  4,　5,　6,　7,　8,　9, 10, 11, 12, 13, 14,
    15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, -1, -1, -1, -1, -1,
    -1, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40,
    41, 42, 43, 44, 45, 46, 47, 48, 49, 50, 51, -1, -1, -1, -1, -1);
  function base64decode(str) {
    var c1, c2, c3, c4;
    var i, len, out;
    len = str.length;
    i = 0;
    out = "";
    while(i < len) {
      /* c1 */
      do {
        c1 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while(i < len && c1 == -1);
      if(c1 == -1)
        break;
      /* c2 */
      do {
        c2 = base64DecodeChars[str.charCodeAt(i++) & 0xff];
      } while(i < len && c2 == -1);
      if(c2 == -1)
        break;
      out += String.fromCharCode((c1 << 2) | ((c2 & 0x30) >> 4));
      /* c3 */
      do {
        c3 = str.charCodeAt(i++) & 0xff;
        if(c3 == 61)
          return out;
        c3 = base64DecodeChars[c3];
      } while(i < len && c3 == -1);
      if(c3 == -1)
        break;
      out += String.fromCharCode(((c2 & 0XF) << 4) | ((c3 & 0x3C) >> 2));
      /* c4 */
      do {
        c4 = str.charCodeAt(i++) & 0xff;
        if(c4 == 61)
          return out;
        c4 = base64DecodeChars[c4];
      } while(i < len && c4 == -1);
      if(c4 == -1)
        break;
      out += String.fromCharCode(((c3 & 0x03) << 6) | c4);
    }
    return out;
  }
  var t = getUrlParam('reg_confirmed_token');
  if (t) {
    setTimeout(function(){
      alertTip('恭喜您 '+ base64decode(t) + ' 已注册成功，马上登录吧!', 'alert-success');
    }, 100);
  }
})(jQuery, document, window);

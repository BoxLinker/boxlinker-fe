(function($, doc, win) {
  const Form = boxlinker.Form;
  const FormElement = boxlinker.FormElement;

  const $form = $('#login-form');
  const $name = $form.find('input[name=name]');
  const $nameAlert = $name.siblings('.form-alert-tip');
  const $pass = $form.find('input[name=password]');
  const $passAlert = $pass.siblings('.form-alert-tip');

  const nameEle = new FormElement({
    $el: $name,
    $elMsg: $nameAlert,
    rules: ['required'],
    getValue() {
      return $name.val();
    },
  });

  const passEle = new FormElement({
    $el: $pass,
    $elMsg: $passAlert,
    rules: ['required'],
    getValue() {
      return $pass.val();
    },
  });
  const $alert = $('#alert-login-failed');
  new Form({
    $el: $form,
    elements: [nameEle, passEle],
    onSubmit() {
      const data = {
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
              location.href = boxlinker.settings.directURL.consoleURL;
              break;
            case 1: // 用户名或密码错误
              $alert.show();
              break;
            default:
              break;
          }
        },
        error() {},
      });
    },
  });
})(jQuery, document, window);

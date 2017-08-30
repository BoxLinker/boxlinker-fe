(function($, doc, win) {
  const Form = boxlinker.Form;
  const FormElement = boxlinker.FormElement;

  const $form = $('#forgot-pass-form');
  const $email = $form.find('input[name=email]');
  const $emailAlert = $email.siblings('.form-alert-tip');

  const emailEle = new FormElement({
    $el: $email,
    $elMsg: $emailAlert,
    rules: ['required', 'emailRegex'],
    getValue() {
      return $email.val();
    },
    rulesObj: {
      emailRegex: {
        fn(val) {
          return new Promise((resolve, reject) => {
            /^[\w\\.-]+@\w+\.(cn|com|io|org)$/.test(val)
              ? resolve()
              : reject('emailRegex');
          });
        },
        errMsg: '邮箱格式不正确',
      },
    },
  });

  new Form({
    $el: $form,
    elements: [emailEle],
    onSubmit() {
      const data = {
        email: $email.val(),
      };

      console.log('form data:> ', data);

      $.ajax({
        type: 'POST',
        url: 'https://api.boxlinker.com/v1/user/auth/forgot-password',
        data: JSON.stringify(data),
        dataType: 'json',
        success(ret) {
          switch (ret.status) {
            case 0: // ok
              alert('ff');
              break;
            case 1: // 用户名或密码错误
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

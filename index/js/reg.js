(function($, doc, win) {
  const Form = boxlinker.Form;
  const FormElement = boxlinker.FormElement;

  const $form = $('#reg-form');
  const $name = $form.find('input[name=name]');
  const $nameAlert = $name.siblings('.form-alert-tip');
  const $email = $form.find('input[name=email]');
  const $emailAlert = $email.siblings('.form-alert-tip');
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

  const passEle = new FormElement({
    $el: $pass,
    $elMsg: $passAlert,
    rules: ['required', 'passRegex'],
    getValue() {
      return $pass.val();
    },
    rulesObj: {
      passRegex: {
        fn(val) {
          return /.{6}/.test(val)
            ? Promise.resolve()
            : Promise.reject('passRegex');
        },
        errMsg: '密码格式不正确',
      },
    },
  });
  var $status = $('.submit-status');
  var $statusSpan = $('.submit-status > span');
  new Form({
    $el: $form,
    elements: [nameEle, emailEle, passEle],
    onSubmit() {
      const data = {
        username: $name.val(),
        password: $pass.val(),
        email: $email.val(),
      };

      console.log('form data:> ', data);
      $status.show();
      $status.find('.spinner').show();
      $.ajax({
        type: 'POST',
        url: boxlinker.settings.api.reg,
        data: JSON.stringify(data),
        dataType: 'json',
        success(ret) {
          $status.find('.spinner').hide();
          switch (ret.status) {
            case 0: // ok
              $statusSpan.removeClass('success error').addClass('success').find('b').text('注册成功，验证邮件已发送到您的邮箱：'+$email.val()+' ，请您到邮箱中完成验证。').show();
              break;
            case 100: // username exists
              $statusSpan.removeClass('success error').addClass('error').find('b').text('用户 '+ $name.val() + ' 已经存在。').show();
              break;
            case 101: // email exists
              $statusSpan.removeClass('success error').addClass('error').find('b').text('邮箱 '+ $email.val() + ' 已经存在。').show();
              break;
          }
          if (ret.status != 0) {
            setTimeout(function(){
              $status.hide();
            }, 2000);
          }
        },
        error() {
        },
      });
    },
  });
})(jQuery, document, window);

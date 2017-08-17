(function ($, doc, win) {
  var Form = boxlinker.Form
  var FormElement = boxlinker.FormElement

  var $form = $('#login-form')
  var $name = $form.find('input[name=name]')
  var $nameAlert = $name.siblings('.form-alert-tip')
  var $pass = $form.find('input[name=password]')
  var $passAlert = $pass.siblings('.form-alert-tip')

  var nameEle = new FormElement({
    $el: $name,
    $elMsg: $nameAlert,
    rules:['required'],
    getValue:function(){
      return $name.val()
    }
  })

  var passEle = new FormElement({
    $el: $pass,
    $elMsg: $passAlert,
    rules: ['required'],
    getValue:function(){
      return $pass.val()
    }
  })
  var $alert = $('#alert-login-failed')
  new Form({
    $el: $form,
    elements:[
      nameEle, passEle
    ],
    onSubmit:function(){
      var data = {
        username: $name.val(),
        password: $pass.val()
      }
      $alert.hide()

      console.log('form data:> ', data)

      $.ajax({
        type: 'POST',
        url: boxlinker.settings.api.login,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(ret){
          switch (ret.status) {
            case 0:       // ok
              window.href = boxlinker.settings.directURL.consoleURL
              break;
            case 1:       // 用户名或密码错误
              $alert.show()
              break;
            default:
              break;
          }
        },
        error: function(){}
      })

    }
  })



})(jQuery, document, window);
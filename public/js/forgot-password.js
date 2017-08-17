(function ($, doc, win) {
  var Form = boxlinker.Form
  var FormElement = boxlinker.FormElement

  var $form = $('#forgot-pass-form')
  var $email = $form.find('input[name=email]')
  var $emailAlert = $email.siblings('.form-alert-tip')

  var emailEle = new FormElement({
    $el: $email,
    $elMsg: $emailAlert,
    rules:['required','emailRegex'],
    getValue:function(){
      return $email.val()
    },
    rulesObj:{
      emailRegex: {
        fn: function(val){
          return new Promise(function(resolve, reject){
            /^[\w\\.-]+@\w+\.(cn|com|io|org)$/.test(val)?resolve():reject('emailRegex')
          })
        },
        errMsg: '邮箱格式不正确'
      }
    }
  })

  new Form({
    $el: $form,
    elements:[
      emailEle
    ],
    onSubmit:function(){
      var data = {
        email: $email.val(),
      }

      console.log('form data:> ', data)

      $.ajax({
        type: 'POST',
        url: 'https://api.boxlinker.com/v1/user/auth/forgot-password',
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(ret){
          switch (ret.status) {
            case 0:       // ok
              alert('ff')
              break;
            case 1:       // 用户名或密码错误
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
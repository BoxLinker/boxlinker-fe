(function ($, doc, win) {
  var Form = boxlinker.Form
  var FormElement = boxlinker.FormElement

  var $form = $('#reg-form')
  var $name = $form.find('input[name=name]')
  var $nameAlert = $name.siblings('.form-alert-tip')
  var $email = $form.find('input[name=email]')
  var $emailAlert = $email.siblings('.form-alert-tip')
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

  var passEle = new FormElement({
    $el: $pass,
    $elMsg: $passAlert,
    rules: ['required', 'passRegex'],
    getValue:function(){
      return $pass.val()
    },
    rulesObj: {
      passRegex: {
        fn: function(val){
          return /.{6}/.test(val)?Promise.resolve():Promise.reject('passRegex')
        },
        errMsg: '密码格式不正确'
      }
    }
  })

  new Form({
    $el: $form,
    elements:[
      nameEle, emailEle, passEle
    ],
    onSubmit:function(){
      var data = {
        username: $name.val(),
        password: $pass.val(),
        email: $email.val()
      }

      console.log('form data:> ', data)

      $.ajax({
        type: 'POST',
        url: boxlinker.settings.api.reg,
        data: JSON.stringify(data),
        dataType: 'json',
        success: function(ret){
          switch (ret.status) {
            case 0:       // ok
              alert('ok')
              break;
            case 100:     // username exists
              break;
            case 101:     // email exists
              break;
          }
        },
        error: function(){}
      })

    }
  })



})(jQuery, document, window);
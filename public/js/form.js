(function ($, doc, win) {

  if (typeof boxlinker == 'undefined') {
    window.boxlinker = {}
  }

  var Form = function(options){
    this.init(options)
  }

  Form.prototype = {
    init:function(options){
      this.$el = options.$el
      this.elements = options.elements
      this.onSubmit = options.onSubmit || function(){}
      this.bindEvents()
    },
    bindEvents:function(){
      var eles = this.elements, me = this;
      this.$el.on('submit', function(e){
        var fns = []
        for (var i=0;i<eles.length; i++){
          fns.push(eles[i].formValidate())
        }
        Promise.all(fns).then(function(val){
          // ajax reg
          console.log('>>>++', val)
          me.onSubmit&&me.onSubmit.call()
        },function(reason){
          console.log('reject ...', arguments)
        })
        return false
      })
    }
  }

  var FormElement = function(options){
    this.init(options)
  }

  FormElement.prototype = {
    init:function(options){
      this.$el = options.$el
      // 错误信息 $el
      this.$elMsg = options.$elMsg
      this.rulesObj = $.extend({},this.defaultRulesObj, options.rulesObj)
      delete options.rulesFunc
      this.options = $.extend({},this.defaultOptions,options)
      this.bindEvents()
    },
    rulesObj:{},
    defaultOptions:{
      rules:[],
      getValue:function(){return null}
    },
    defaultRulesObj:{
      required: {
        fn:function(val){
          return new Promise(function(resolve, reject){
            if (!val) {
              reject('required')
            } else {
              resolve()
            }
          })
        },
        errMsg: '该项必填'
      }
    },
    clearErrMsg:function(){
      this.$el.parent('.form-group').removeClass('has-error')
      this.$elMsg.text(null)
    },
    setErrMsg:function(msg){
      this.$el.parent('.form-group').addClass('has-error')
      this.$elMsg.text(msg)
    },
    _validate:function(resolve,reject){
      var fns = [], me = this
      for(var i=0;i<this.options.rules.length; i++){
        var rule = this.options.rules[i]
        var ruleObj = this.rulesObj[rule]
        if (!ruleObj){
          console.warn('ruleObj not found by: ', rule)
          continue
        }
        fns.push(ruleObj.fn(me.options.getValue()))
      }
      Promise.all(fns).then(function(val){
        me.clearErrMsg()
        resolve&&resolve(val)
      },function(reason){
        me.setErrMsg(me.rulesObj[reason].errMsg)
        reject&&reject(reason)
      }).catch(function(){
        console.error('_validate err: ', arguments)
      })
    },
    validate:function(){
      this._validate(null,null)
    },
    formValidate:function(){
      var me = this
      return new Promise(function(resolve, reject){
        me._validate(resolve,reject)
      })
    },
    bindEvents:function(){
      $(this.$el).on('input',this.validate.bind(this))
    },
  }

  boxlinker.Form = Form
  boxlinker.FormElement = FormElement

})(jQuery, document, window);
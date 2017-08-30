(function($, doc, win) {
  if (typeof boxlinker === 'undefined') {
    window.boxlinker = {};
  }

  const Form = function(options) {
    this.init(options);
  };

  Form.prototype = {
    init(options) {
      this.$el = options.$el;
      this.elements = options.elements;
      this.onSubmit = options.onSubmit || function() {};
      this.bindEvents();
    },
    bindEvents() {
      let eles = this.elements,
        me = this;
      this.$el.on('submit', e => {
        const fns = [];
        for (let i = 0; i < eles.length; i++) {
          fns.push(eles[i].formValidate());
        }
        Promise.all(fns).then(
          val => {
            // ajax reg
            console.log('>>>++', val);
            me.onSubmit && me.onSubmit.call();
          },
          function(reason) {
            console.log('reject ...', arguments);
          },
        );
        return false;
      });
    },
  };

  const FormElement = function(options) {
    this.init(options);
  };

  FormElement.prototype = {
    init(options) {
      this.$el = options.$el;
      // 错误信息 $el
      this.$elMsg = options.$elMsg;
      this.rulesObj = $.extend({}, this.defaultRulesObj, options.rulesObj);
      delete options.rulesFunc;
      this.options = $.extend({}, this.defaultOptions, options);
      this.bindEvents();
    },
    rulesObj: {},
    defaultOptions: {
      rules: [],
      getValue() {
        return null;
      },
    },
    defaultRulesObj: {
      required: {
        fn(val) {
          return new Promise((resolve, reject) => {
            if (!val) {
              reject('required');
            } else {
              resolve();
            }
          });
        },
        errMsg: '该项必填',
      },
    },
    clearErrMsg() {
      this.$el.parent('.form-group').removeClass('has-error');
      this.$elMsg.text(null);
    },
    setErrMsg(msg) {
      this.$el.parent('.form-group').addClass('has-error');
      this.$elMsg.text(msg);
    },
    _validate(resolve, reject) {
      let fns = [],
        me = this;
      for (let i = 0; i < this.options.rules.length; i++) {
        const rule = this.options.rules[i];
        const ruleObj = this.rulesObj[rule];
        if (!ruleObj) {
          console.warn('ruleObj not found by: ', rule);
          continue;
        }
        fns.push(ruleObj.fn(me.options.getValue()));
      }
      Promise.all(fns)
        .then(
          val => {
            me.clearErrMsg();
            resolve && resolve(val);
          },
          reason => {
            me.setErrMsg(me.rulesObj[reason].errMsg);
            reject && reject(reason);
          },
        )
        .catch(function() {
          console.error('_validate err: ', arguments);
        });
    },
    validate() {
      this._validate(null, null);
    },
    formValidate() {
      const me = this;
      return new Promise((resolve, reject) => {
        me._validate(resolve, reject);
      });
    },
    bindEvents() {
      $(this.$el).on('input', this.validate.bind(this));
    },
  };

  boxlinker.Form = Form;
  boxlinker.FormElement = FormElement;
})(jQuery, document, window);

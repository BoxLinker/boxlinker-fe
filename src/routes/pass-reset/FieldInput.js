import React from 'react';
import PropTypes from 'prop-types';
import { FormElement } from 'bui';

// const logger = console;
const ruleHasNot = (name = '', rules = []) => {
  if (!name || typeof name !== 'string') {
    return true;
  }
  const l = rules.length;
  for (let i = 0; i < l; i += 1) {
    const rule = rules[i];
    if (!rule || typeof rule !== 'string') {
      continue; //eslint-disable-line
    }
    if (rule.split(':')[0] === name) {
      return false;
    }
  }
  return true;
};

export default class FieldInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    type: PropTypes.string,
    label: PropTypes.string,
    rules: PropTypes.arrayOf(
      PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    ),
    placeholder: PropTypes.string,
    required: PropTypes.oneOfType([PropTypes.bool, PropTypes.string]),
  };
  static defaultProps = {
    type: 'text',
    label: '',
    placeholder: '',
    required: false,
    rules: null, // 这里不能给默认值，不然多个 FieldInput 之间就引用了同一个数组了
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errMsg: '',
    };
  }
  onChange = ({ target: { value } }) => {
    this.setState({
      value,
    });
    if (this.refEle) {
      this.refEle.validate();
    }
  };
  onErrMsg = err => {
    this.setState({
      errMsg: err[1],
    });
  };
  getRefElement() {
    return this.refEle;
  }
  getValue() {
    return this.state.value;
  }
  getRules() {
    const { required, type, label } = this.props;
    let { rules } = this.props;
    if (!rules || !Array.isArray(rules)) {
      rules = [];
    }
    if (required && ruleHasNot('required', rules)) {
      rules.push(
        ['required', required === true ? `${label}不能为空` : required].join(
          ':',
        ),
      );
    }
    switch (type) {
      case 'email':
        if (ruleHasNot('regexEmail', rules)) {
          rules.push(`regexEmail:${label}格式不正确`);
        }
        break;
      case 'password':
        if (ruleHasNot('regexPassword', rules)) {
          rules.push(`regexPassword:${label}格式不正确, 至少六位`);
        }
        break;
      default:
    }
    return rules;
  }
  render() {
    const { type, placeholder, name, label } = this.props;
    const { errMsg, value } = this.state;
    return (
      <FormElement
        name={name}
        rules={this.getRules()}
        ref={ref => {
          this.refEle = ref;
        }}
        onErrMsg={this.onErrMsg}
        getValue={() => this.state.value}
      >
        <div className={`form-group ${errMsg ? 'has-error' : ''}`}>
          <input
            name={name}
            type={type}
            className="form-control"
            value={value}
            onChange={this.onChange}
            placeholder={placeholder || label}
          />
          {errMsg ? <p className="help-block text-left">{errMsg}</p> : null}
        </div>
      </FormElement>
    );
  }
}

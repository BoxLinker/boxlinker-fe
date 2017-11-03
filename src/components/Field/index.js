import React from 'react';
import PropTypes from 'prop-types';
import { FormElement } from 'boxlinker-ui'; // eslint-disable-line

const REQUIRED_TIP = '不能为空';

export default class Field extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    rules: PropTypes.array, // eslint-disable-line
    required: PropTypes.bool,
    requiredTip: PropTypes.string,
    children: PropTypes.any, // eslint-disable-line
    onGetValue: PropTypes.func,
  };
  static defaultProps = {
    label: null,
    rules: [],
    required: false,
    requiredTip: '',
    onGetValue: () => undefined,
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      errMsg: '',
    };
  }
  onErrMsg = err => {
    this.setState({
      errMsg: err[1],
    });
  };
  render() {
    const { name, label, children, required, requiredTip, rules } = this.props;
    const { errMsg } = this.state;
    if (required) {
      rules.unshift(`required:${requiredTip || REQUIRED_TIP}`);
    }
    return (
      <FormElement
        name={name}
        rules={rules}
        onErrMsg={this.onErrMsg}
        getValue={this.props.onGetValue}
      >
        <div className={`form-group ${errMsg ? 'has-error' : ''}`}>
          {label ? <h5>{label}</h5> : null}
          {children}
          {errMsg ? <p className="help-block">{errMsg}</p> : null}
        </div>
      </FormElement>
    );
  }
}

import React from 'react';
import PropTypes from 'prop-types';
import { FormElement } from 'boxlinker-ui'; // eslint-disable-line

/* eslint-disable jsx-a11y/label-has-for */

const REQUIRED_TIP = '不能为空';

export default class Field extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    inlineMode: PropTypes.bool,
    label: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
    rules: PropTypes.array, // eslint-disable-line
    required: PropTypes.bool,
    requiredTip: PropTypes.string,
    children: PropTypes.any, // eslint-disable-line
    onGetValue: PropTypes.func,
    value: PropTypes.any, // eslint-disable-line
    staticMode: PropTypes.bool,
  };
  static defaultProps = {
    inlineMode: false,
    staticMode: false,
    value: '',
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
  getBody() {
    const { errMsg } = this.state;
    const { inlineMode, label, children } = this.props;
    if (inlineMode) {
      return (
        <div className={`form-group ${errMsg ? 'has-error' : ''}`}>
          <label className="col-md-3 control-label">{label}</label>
          <div className="col-md-9">
            {children}
            {errMsg ? <p className="help-block">{errMsg}</p> : null}
          </div>
        </div>
      );
    }
    return (
      <div className={`form-group ${errMsg ? 'has-error' : ''}`}>
        {label ? <label className="control-label">{label}</label> : null}
        {children}
        {errMsg ? <p className="help-block">{errMsg}</p> : null}
      </div>
    );
  }
  render() {
    const {
      name,
      required,
      requiredTip,
      rules,
      value,
      staticMode,
    } = this.props;
    if (required) {
      rules.unshift(`required:${requiredTip || REQUIRED_TIP}`);
    }
    if (staticMode) {
      return <p className="form-control-static">{value}</p>;
    }
    return (
      <FormElement
        name={name}
        rules={rules}
        onErrMsg={this.onErrMsg}
        getValue={this.props.onGetValue}
      >
        {this.getBody()}
      </FormElement>
    );
  }
}

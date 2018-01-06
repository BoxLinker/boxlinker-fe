import React from 'react';
import PropTypes from 'prop-types';
import FormElement from '../FormElement';

export default class extends React.Component {
  static propTypes = {
    children: PropTypes.element,
    name: PropTypes.string,
    label: PropTypes.string,
    rules: PropTypes.arrayOf(
      PropTypes.oneOfType(PropTypes.string, PropTypes.func),
    ),
  };
  static defaultProps = {
    children: null,
    name: '',
    label: '',
    rules: [],
  };
  constructor(props) {
    super(props);
    this.state = {
      errMsg: '',
    };
  }
  onErrMsg = err => {
    this.setState({
      errMsg: err[1],
    });
  };
  getRefElement() {
    return this.refEle;
  }
  render() {
    const { children, rules, name, label } = this.props;
    const { errMsg } = this.state;
    return (
      <FormElement
        name={name}
        rules={rules}
        ref={ref => {
          this.refEle = ref;
        }}
        onErrMsg={this.onErrMsg}
        getValue={() => this.state.value}
      >
        <div className={`form-group ${errMsg ? 'has-error' : ''}`}>
          <h5 className="control-label">{label}</h5>
          {children}
          {errMsg ? <p className="help-block text-left">{errMsg}</p> : null}
        </div>
      </FormElement>
    );
  }
}

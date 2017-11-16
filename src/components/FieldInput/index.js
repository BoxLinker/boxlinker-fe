import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

export default class FieldInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    // label: PropTypes.string,
    value: PropTypes.string,
    staticMode: PropTypes.bool,
    inlineMode: PropTypes.bool,
    type: PropTypes.string,
    placeholder: PropTypes.string,
  };
  static defaultProps = {
    // label: '',
    value: '',
    staticMode: false,
    inlineMode: false,
    type: 'text',
    placeholder: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      value: props.value,
    };
  }
  onChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };
  getInput() {
    const { name, type, placeholder } = this.props;
    const { value } = this.state;
    return (
      <input
        value={value}
        name={name}
        type={type}
        className="form-control"
        onChange={this.onChange}
        placeholder={placeholder}
      />
    );
  }
  render() {
    const { ...props } = this.props;
    return <Field {...props}>{this.getInput()}</Field>;
  }
}

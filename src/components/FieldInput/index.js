import React from 'react';
import PropTypes from 'prop-types';
import Field from '../Field';

export default class FieldInput extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    label: PropTypes.string,
    type: PropTypes.string,
    placeholder: PropTypes.string,
  };
  static defaultProps = {
    label: '',
    type: 'text',
    placeholder: '',
  };
  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }
  onChange = e => {
    const value = e.target.value;
    this.setState({ value });
  };
  render() {
    const { name, type, label, placeholder } = this.props;
    const { value } = this.state;
    return (
      <Field name={name} label={label}>
        <input
          value={value}
          name={name}
          type={type}
          className="form-control"
          onChange={this.onChange}
          placeholder={placeholder}
        />
      </Field>
    );
  }
}

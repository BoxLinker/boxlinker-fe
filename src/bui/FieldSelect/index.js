import React from 'react';
import PropTypes from 'prop-types';
import Select from '../Select';
import Field from '../Field';

const { Option } = Select;

export default class extends React.Component {
  static propTypes = {
    data: PropTypes.arrayOf(PropTypes.object),
  };
  static defaultProps = {
    data: [],
  };
  getOptions() {
    const { data } = this.props;
    return data.map(item => {
      const { label, value } = item;
      return <Option label={label} value={value} />;
    });
  }
  render() {
    return (
      <Field {...this.props}>
        <Select>{this.getOptions()}</Select>
      </Field>
    );
  }
}

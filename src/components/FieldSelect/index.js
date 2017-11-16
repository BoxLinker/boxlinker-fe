import React from 'react';
import { Select } from 'bui';
import Field from '../Field';

class FieldSelect extends React.Component {
  render() {
    return (
      <Field {...this.props}>
        <Select {...this.props} />
      </Field>
    );
  }
}

export SaveableSelect from './SaveableSelect';

export default FieldSelect;

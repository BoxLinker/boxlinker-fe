import React from 'react';
import { Toggle } from 'bui';
import Field from '../Field';

class FieldToggle extends React.Component {
  render() {
    return (
      <Field {...this.props}>
        <div>
          <Toggle icons={false} {...this.props} />
        </div>
      </Field>
    );
  }
}

export SaveableToggle from './SaveableToggle';

export default FieldToggle;

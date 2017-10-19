import React, { Component } from 'react';
import hoistNonReactStatic from 'hoist-non-react-statics';

export default option => WrappedComponent => {
  const { displayName } = option;

  class Validatable extends Component {
    static displayName = `Validatable${displayName}`;
    render() {
      return <div />;
    }
  }
  hoistNonReactStatic(Validatable, WrappedComponent);
  return Validatable;
};

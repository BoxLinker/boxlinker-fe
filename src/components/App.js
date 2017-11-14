import React from 'react';
import PropTypes from 'prop-types';
import { Provider as ReduxProvider } from 'react-redux';

const contextType = {
  event: PropTypes.object.isRequired,
  insertCss: PropTypes.func.isRequired,
  // Universal HTTP client
  // fetch: PropTypes.func.isRequired,
  // Integrate Redux
  // http://redux.js.org/docs/basics/UsageWithReact.html
  ...ReduxProvider.childContextTypes,
};

class App extends React.PureComponent {
  static propTypes = {
    context: PropTypes.shape(contextType).isRequired,
    children: PropTypes.element.isRequired,
  };

  static childContextTypes = contextType;

  getChildContext() {
    return this.props.context;
  }

  render() {
    return React.Children.only(this.props.children);
  }
}

export default App;

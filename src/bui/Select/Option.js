/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

class Option extends React.Component {
  static propTypes = {
    value: PropTypes.any, //eslint-disable-line
    onClick: PropTypes.func,
    children: PropTypes.any, //eslint-disable-line
  };
  static defaultProps = {
    label: '',
    value: '',
    onClick: noop,
  };
  onClick = () => {
    this.props.onClick(this.props.value);
  };
  render() {
    return (
      <li className="bui-dropdown-results-option">{this.props.children}</li>
    );
  }
}

export default Option;

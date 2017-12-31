/* eslint-disable no-script-url */
import React from 'react';
import PropTypes from 'prop-types';

const noop = () => {};

class Option extends React.Component {
  static propTypes = {
    value: PropTypes.string,
    children: PropTypes.any, //eslint-disable-line
    onClick: PropTypes.func,
  };
  static defaultProps = {
    value: '',
    children: null,
    onClick: noop,
  };
  onClick = () => {
    this.props.onClick(this.props.value);
  };
  render() {
    const { children } = this.props;
    return (
      <li className="bui-dropdown-results-option">
        <a href="javascript:void(0)" onClick={this.onClick}>
          {children}
        </a>
      </li>
    );
  }
}

export default Option;

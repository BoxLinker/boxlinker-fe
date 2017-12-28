import React from 'react';
import PropTypes from 'prop-types';

export default class Alert extends React.Component {
  static propTypes = {
    closeable: PropTypes.bool,
    theme: PropTypes.string,
    children: PropTypes.any, // eslint-disable-line
  };
  static defaultProps = {
    theme: 'primary',
    closeable: true,
    children: 'Alert message.',
  };
  render() {
    const { closeable, theme } = this.props;
    let closeBtn = null;
    if (closeable) {
      closeBtn = (
        <button className="close" data-dismiss="alert">
          <i className="pci-cross pci-circle" />
        </button>
      );
    }
    return (
      <div className={`alert alert-${theme}`}>
        {closeBtn}
        {this.props.children}
      </div>
    );
  }
}

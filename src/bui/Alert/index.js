import React from 'react';
import PropTypes from 'prop-types';

class Alert extends React.Component {
  static propTypes = {
    closeable: PropTypes.bool,
    type: PropTypes.string,
    children: PropTypes.any, // eslint-disable-line
  };
  static defaultProps = {
    type: 'primary',
    closeable: false,
    children: 'Alert message.',
  };
  render() {
    const { closeable, type } = this.props;
    let closeBtn = null;
    if (closeable) {
      closeBtn = (
        <button className="close" data-dismiss="alert">
          <i className="pci-cross pci-circle" />
        </button>
      );
    }
    return (
      <div className={`alert alert-${type}`}>
        {closeBtn}
        {this.props.children}
      </div>
    );
  }
}

export default Alert;

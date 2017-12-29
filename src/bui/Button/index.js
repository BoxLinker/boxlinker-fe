import React from 'react';
import PropTypes from 'prop-types';

class Button extends React.Component {
  static propTypes = {
    theme: PropTypes.string,
    type: PropTypes.string,
    style: PropTypes.object, // eslint-disable-line
    buttonType: PropTypes.string,
    size: PropTypes.string,
    loading: PropTypes.bool,
    block: PropTypes.bool,
    children: PropTypes.any, // eslint-disable-line
    loadingIcon: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  };
  static defaultProps = {
    theme: 'default',
    type: 'default',
    style: {},
    buttonType: 'button',
    block: false,
    size: '',
    loadingIcon: 'Loading...',
    loading: false,
    children: 'Button',
  };
  render() {
    const {
      loading,
      loadingIcon,
      theme,
      size,
      block,
      type,
      buttonType,
      style,
    } = this.props;
    const sSize = `${size ? `btn-${size}` : ''}`;
    const blockCls = `${block ? 'btn-block' : ''}`;

    let look = theme;
    if (type) {
      look = type;
    }

    if (loading) {
      return (
        <button
          style={style}
          type={buttonType}
          className={`btn btn-${look} ${sSize} ${blockCls}`}
          disabled
        >
          {loadingIcon}
        </button>
      );
    }
    return (
      <button
        style={style}
        type={buttonType}
        className={`btn btn-${look} ${sSize} ${blockCls}`}
      >
        {this.props.children}
      </button>
    );
  }
}

export default Button;

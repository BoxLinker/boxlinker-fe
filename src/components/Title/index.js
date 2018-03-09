import React from 'react';
import PropTypes from 'prop-types';
import './style.css';

class Comp extends React.Component {
  static propTypes = {
    size: PropTypes.number,
  };
  static defaultProps = {
    size: 1,
  };
  render() {
    const { size, children } = this.props;
    switch (size) {
      case 1:
        return <h1 className={['bl-title']}>{children}</h1>;
      case 2:
        return <h2 className={['bl-title']}>{children}</h2>;
      case 3:
        return <h3 className={['bl-title']}>{children}</h3>;
      case 4:
        return <h4 className={['bl-title']}>{children}</h4>;
      case 5:
        return <h5 className={['bl-title']}>{children}</h5>;
      default:
        return null;
    }
  }
}

export default Comp;

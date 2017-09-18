import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
// import Select2 from 'react-select';

import Body from './Body';
import HeaderBar from './HeaderBar';
import s from './index.pcss';

class Comp extends React.Component {
  static contextTypes = {
    event: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      isIn: false,
    };
    ['onClose'].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
  }
  componentDidMount() {
    this.context.event.on('app.new.show', this.show);
    this.context.event.on('app.new.toggle', this.toggle);
  }
  componentWillUnmount() {
    this.context.event.on('app.new.show', this.show);
    this.context.event.on('app.new.toggle', this.toggle);
  }
  onClose() {
    this.setState({
      isIn: false,
    });
    setTimeout(() => {
      this.setState({
        isShow: false,
      });
    }, 300);
  }
  toggle = flag => {
    let f = flag;
    if (typeof f === 'undefined') {
      f = !this.state.isShow;
    }
    this.setState({
      isShow: f,
    });
    setTimeout(() => {
      this.setState({
        isIn: f,
      });
    }, 0);
  };
  show = () => {
    this.toggle(true);
  };
  render() {
    const { isShow, isIn } = this.state;
    return (
      <div
        className={cx(s.root, isShow ? s.root_show : '', isIn ? s.root_in : '')}
      >
        <div>
          <HeaderBar onClose={this.onClose} />
          <Body />
        </div>
      </div>
    );
  }
}
// className={cx('collapse', isShow ? 'in' : '')}
export default withStyles(s)(Comp);

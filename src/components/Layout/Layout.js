import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';

// external-global styles must be imported in your JS.
import normalizeCss from 'normalize.css';
/* eslint-disable import/no-unresolved */
// import buiCss from 'boxlinker-ui/dist/bui.css';
import BUI_CSS from 'bui/style.less';

import s from './Layout.css';
import Header from '../Header';
import MainNav from '../MainNav';
import Content from '../Content';
import Notification from '../Notification';

class Layout extends React.Component {
  static propTypes = {
    path: PropTypes.string,
    children: PropTypes.node.isRequired,
  };
  static defaultProps = {
    path: '',
  };
  render() {
    return (
      <div
        id="container"
        className="effect aside-float aside-bright mainnav-lg navbar-fixed"
      >
        <Header />
        <div className="boxed">
          <MainNav path={this.props.path} />
          <Content>{this.props.children}</Content>
        </div>
        <Notification />
      </div>
    );
  }
}

export default withStyles(
  normalizeCss,
  BUI_CSS,
  // buiCss,
  s,
)(Layout);

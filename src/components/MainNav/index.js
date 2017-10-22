import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './index.css';
import Link from '../Link';

/* eslint-disable no-script-url */
class MainNav extends React.Component {
  static contextTypes = {
    event: PropTypes.object.isRequired,
    store: PropTypes.object,
  };
  static propTypes = {
    path: PropTypes.string,
  };
  static defaultProps = {
    path: '',
  };
  constructor(props) {
    super(props);
    [].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
  }
  getNavItem({ href, title }) {
    let h = href;
    if (!href.startsWith('/')) {
      h = `/${href}`;
    }
    const active = this.props.path === h ? 'active' : '';
    return (
      <li className={active}>
        <Link to={href}>
          <i className="fa fa-home" />
          <span className="menu-title">
            {title}
          </span>
        </Link>
      </li>
    );
  }
  getUserPanel() {
    const { userinfo } = this.context.store.getState();
    if (!userinfo) {
      return null;
    }
    return (
      <div className="profile-wrap text-center">
        <div className="pad-btm">
          <img
            className="img-circle img-md"
            src="img/profile-photos/1.png"
            alt="User Profile"
          />
        </div>
        <a
          href="#profile-nav"
          className="box-block"
          data-toggle="collapse"
          aria-expanded="true"
        >
          <span className="pull-right dropdown-toggle">
            <i className="dropdown-caret" />
          </span>
          <p className="mnp-name">
            {userinfo.name}
          </p>
          <span className="mnp-desc">
            {userinfo.email}
          </span>
        </a>
      </div>
    );
  }
  // eslint-disable-next-line class-methods-use-this
  getUserPanelDropdown() {
    return (
      <div
        id="profile-nav"
        className="list-group bg-trans collapse"
        aria-expanded="true"
      >
        <a href="/" className="list-group-item">
          <i className="demo-pli-male icon-lg icon-fw" /> View Profile
        </a>
        <a href="/" className="list-group-item">
          <i className="demo-pli-gear icon-lg icon-fw" /> Settings
        </a>
        <a href="/" className="list-group-item">
          <i className="demo-pli-information icon-lg icon-fw" /> Help
        </a>
        <a href="/" className="list-group-item">
          <i className="demo-pli-unlock icon-lg icon-fw" /> Logout
        </a>
      </div>
    );
  }
  render() {
    return (
      <nav id="mainnav-container" className={s.root}>
        <div id="mainnav">
          <div id="mainnav-menu-wrap">
            <div className="nano">
              <div className="nano-content">
                <div id="mainnav-profile" className="mainnav-profile">
                  {this.getUserPanel()}
                  {this.getUserPanelDropdown()}
                </div>
                <ul id="mainnav-menu" className="list-group">
                  <li className="list-header">导航</li>
                  {this.getNavItem({ href: '/demo', title: 'Demo' })}
                  {this.getNavItem({ href: '/', title: '控制台' })}
                  {this.getNavItem({ href: '/applications', title: '应用' })}
                  {this.getNavItem({ href: '/services', title: '服务' })}
                  {this.getNavItem({ href: '/volumes', title: '数据卷' })}
                  {this.getNavItem({ href: '/images', title: '镜像' })}
                  <li className="list-divider" />
                </ul>
              </div>
              <div className="nano-panel" />
            </div>
          </div>
        </div>
      </nav>
    );
  }
}

export default withStyles(s)(MainNav);

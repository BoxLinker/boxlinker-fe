import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import PropTypes from 'prop-types';
import s from './index.css';
import Link from '../Link';

/* eslint-disable no-script-url */
class MainNav extends React.Component {
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
  render() {
    return (
      <div id="mainnav-container" className={s.root}>
        <div id="mainnav">
          <div id="mainnav-menu-wrap">
            <div className="nano">
              <div className="nano-content">
                <div id="mainnav-profile" className="mainnav-profile">
                  <div className="profile-wrap text-center">
                    <div className="pad-btm">
                      <img
                        className="img-circle img-md"
                        src="img/profile-photos/1.png"
                        alt="User Profile"
                      />
                    </div>
                    <a
                      href="javascript:void(0)"
                      className="box-block"
                      data-toggle="collapse"
                      aria-expanded="true"
                    >
                      <span className="pull-right dropdown-toggle">
                        <i className="dropdown-caret" />
                      </span>
                      <p className="mnp-name">Aaron Chavez</p>
                      <span className="mnp-desc">aaron.cha@themeon.net</span>
                    </a>
                  </div>
                  <div
                    id="profile-nav"
                    className="list-group bg-trans collapse"
                    aria-expanded="true"
                  >
                    <a href="/" className="list-group-item">
                      <i className="demo-pli-male icon-lg icon-fw" /> View
                      Profile
                    </a>
                    <a href="/" className="list-group-item">
                      <i className="demo-pli-gear icon-lg icon-fw" /> Settings
                    </a>
                    <a href="/" className="list-group-item">
                      <i className="demo-pli-information icon-lg icon-fw" />{' '}
                      Help
                    </a>
                    <a href="/" className="list-group-item">
                      <i className="demo-pli-unlock icon-lg icon-fw" /> Logout
                    </a>
                  </div>
                </div>
                <ul id="mainnav-menu" className="list-group">
                  <li className="list-header">导航</li>
                  {this.getNavItem({ href: '/', title: '控制台' })}
                  {this.getNavItem({ href: '/applications', title: '应用' })}
                  <li>
                    <a href="javascript:void(0)">
                      <i className="fa fa-home" />
                      <span className="menu-title">Layouts</span>
                      <i className="arrow" />
                    </a>
                    <ul className="collapse">
                      <li>
                        <a href="layouts-offcanvas-revealing-navigation.html">
                          Revealing Navigation
                        </a>
                      </li>
                      <li className="list-divider" />
                      <li>
                        <a href="layouts-aside-right-side.html">
                          Aside on the right side
                        </a>
                      </li>
                      <li>
                        <a href="layouts-aside-left-side.html">
                          Aside on the left side
                        </a>
                      </li>
                      <li className="list-divider" />
                      <li>
                        <a href="layouts-fixed-navbar.html">Fixed Navbar</a>
                      </li>
                    </ul>
                  </li>
                  <li>
                    <a href="index.html">
                      <i className="demo-psi-home" />
                      <span className="menu-title">Dashboard</span>
                    </a>
                  </li>
                  <li className="list-divider" />
                </ul>
              </div>
              <div className="nano-panel" />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(MainNav);

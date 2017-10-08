import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

/* eslint-disable no-script-url */

class Header extends React.Component {
  static contextTypes = {
    event: PropTypes.object.isRequired,
    store: PropTypes.object,
  };
  getUserDropdown() {
    const user = this.context.store.getState().userInfo;
    if (!user) {
      return null;
    }
    return (
      <li className="dropdown">
        <a
          href="javascript:void(0)"
          data-toggle="dropdown"
          className="dropdown-toggle text-right"
        >
          <span className="ic-user pull-right">
            <i className="demo-pli-male" />
          </span>
          <div className="username hidden-xs">
            {user.name}
          </div>
        </a>
        <div className="dropdown-menu dropdown-menu-md dropdown-menu-right panel-default">
          {/* Dropdown heading */}
          <div className="pad-all bord-btm">
            <p className="text-main mar-btm">
              <span className="text-bold">750GB</span> of 1,000GB Used
            </p>
            <div className="progress progress-sm">
              <div className="progress-bar" style={{ width: '70%' }}>
                <span className="sr-only">70%</span>
              </div>
            </div>
          </div>
          {/* User dropdown menu */}
          <ul className="head-list">
            <li>
              <a href="/">
                <i className="demo-pli-male icon-lg icon-fw" /> Profile
              </a>
            </li>
            <li>
              <a href="/">
                <span className="badge badge-danger pull-right">9</span>
                <i className="demo-pli-mail icon-lg icon-fw" /> Messages
              </a>
            </li>
            <li>
              <a href="/">
                <span className="label label-success pull-right">New</span>
                <i className="demo-pli-gear icon-lg icon-fw" /> Settings
              </a>
            </li>
            <li>
              <a href="/">
                <i className="demo-pli-information icon-lg icon-fw" /> Help
              </a>
            </li>
            <li>
              <a href="/">
                <i className="demo-pli-computer-secure icon-lg icon-fw" /> Lock
                screen
              </a>
            </li>
          </ul>
          {/* Dropdown footer */}
          <div className="pad-all text-right">
            <a href="/" className="btn btn-primary">
              <i className="demo-pli-unlock" /> Logout
            </a>
          </div>
        </div>
      </li>
    );
  }
  render() {
    return (
      <header id="navbar" className={s.root}>
        <div id="navbar-container" className="boxed">
          <div className="navbar-header">
            <a href="/" className="navbar-brand">
              <img
                src="img/logo-icon.png"
                alt="Boxlinker Logo"
                className={`brand-icon ${s.brandIcon}`}
              />
              <div className="brand-title">
                <span className="brand-text">BoxLinker</span>
              </div>
            </a>
          </div>
          <div className="navbar-content clearfix">
            <ul className="nav navbar-top-links pull-right">
              <li>
                <a
                  href="javascript:void(0)"
                  onClick={() => {
                    this.context.event.emit('app.new.toggle');
                  }}
                >
                  <i className="fa fa-plus-circle" />
                </a>
              </li>
              {this.getUserDropdown()}
            </ul>
          </div>
        </div>
      </header>
    );
  }
}

export default withStyles(s)(Header);
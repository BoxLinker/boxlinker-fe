import React from 'react';
// import PropTypes from 'prop-types';
/* eslint-disable import/no-unresolved, import/extensions */
import { Form, FormElement } from 'boxlinker-ui';
import bFetch from 'bfetch';
import cls from './style';
import { API } from '../../constants';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      usernameErrMsg: '',
      passwordErrMsg: '',
    };
  }
  onSubmit = async (data, err) => {
    if (err) {
      return;
    }
    const res = await bFetch(API.LOGIN, {
      method: 'POST',
      body: JSON.stringify(data),
    });
    console.log('login res:>', res); // eslint-disable-line
  };
  onElementErrMsg = err => {
    this.setState({
      [`${err[0]}ErrMsg`]: err[1],
    });
  };
  onElementChange = e => {
    const v = e.target.value;
    switch (e.target.name) {
      case 'username':
        this.setState({
          username: v,
        });
        this.refUsername.validate();
        break;
      case 'password':
        this.setState({
          password: v,
        });
        this.refPassword.validate();
        break;
      default:
    }
  };
  getUsernameField() {
    const { usernameErrMsg } = this.state;
    return (
      <FormElement
        name="username"
        rules={['required:用户名称不能为空', 'regexName:格式不正确(字母、数字、下划线, 16 位以内)']}
        ref={ref => {
          this.refUsername = ref;
        }}
        onErrMsg={this.onElementErrMsg}
        getValue={() => this.state.username}
      >
        <div
          style={cls.field}
          className={`form-group ${usernameErrMsg ? 'has-error' : ''}`}
        >
          <input
            name="username"
            type="text"
            className="form-control"
            onChange={this.onElementChange}
            placeholder="用户名"
          />
          {usernameErrMsg
            ? <p className="help-block">
                {usernameErrMsg}
              </p>
            : null}
        </div>
      </FormElement>
    );
  }
  getPasswordField() {
    const { passwordErrMsg } = this.state;
    return (
      <FormElement
        name="password"
        rules={['required:密码不能为空']}
        ref={ref => {
          this.refPassword = ref;
        }}
        onErrMsg={this.onElementErrMsg}
        getValue={() => this.state.password}
      >
        <div
          style={cls.field}
          className={`form-group ${passwordErrMsg ? 'has-error' : ''}`}
        >
          <input
            name="password"
            type="password"
            className="form-control"
            onChange={this.onElementChange}
            placeholder="密码"
          />
          {passwordErrMsg
            ? <p className="help-block">
                {passwordErrMsg}
              </p>
            : null}
        </div>
      </FormElement>
    );
  }
  render() {
    return (
      <div style={cls.wrapper} className="cls-container">
        <div className="cls-content">
          <div className="cls-content-sm panel">
            <div className="panel-body">
              <div className="mar-ver pad-btm">
                <h1 className="h3">从这里开始</h1>
                <p>登录您的账户</p>
              </div>
              <Form
                onSubmit={this.onSubmit}
                getElements={() => [this.refUsername, this.refPassword]}
              >
                <div>
                  {this.getUsernameField()}
                  {this.getPasswordField()}
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    登录
                  </button>
                </div>
              </Form>
            </div>
            <div className="pad-all bord-top">
              <a
                href="pages-password-reminder.html"
                className="btn-link mar-rgt"
              >
                忘记密码 ?
              </a>
              <a href="pages-register.html" className="btn-link mar-lft">
                创建新账户
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comp;

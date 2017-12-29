import React from 'react';
// import PropTypes from 'prop-types';
/* eslint-disable import/no-unresolved, import/extensions */
import { Form, FormElement, Alert, Button } from 'bui';
import bFetch from 'bfetch';
import { API } from 'const';
import cls from './style';

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      usernameErrMsg: '',
      passwordErrMsg: '',
      emailErrMsg: '',
      submitErr: null,
      regSuccess: false,
    };
  }
  onSubmit = async (data, err, that) => {
    that.setState({
      submitErr: null,
    });
    if (err) {
      return;
    }
    try {
      const res = await bFetch(API.USER.REG, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      console.log('reg res:>', res); // eslint-disable-line
      this.setState({
        regSuccess: true,
      });
    } catch (e) {
      that.setState({
        submitErr: e,
      });
    }
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
      case 'email':
        this.setState({
          email: v,
        });
        this.refEmail.validate();
        break;
      default:
    }
  };
  getEmailField() {
    const { emailErrMsg } = this.state;
    return (
      <FormElement
        name="email"
        rules={['required:邮箱不能为空', 'regexEmail:邮箱格式不正确']}
        ref={ref => {
          this.refEmail = ref;
        }}
        onErrMsg={this.onElementErrMsg}
        getValue={() => this.state.email}
      >
        <div
          style={cls.field}
          className={`form-group ${emailErrMsg ? 'has-error' : ''}`}
        >
          <input
            name="email"
            type="text"
            className="form-control"
            onChange={this.onElementChange}
            placeholder="邮箱"
          />
          {emailErrMsg ? <p className="help-block">{emailErrMsg}</p> : null}
        </div>
      </FormElement>
    );
  }
  getUsernameField() {
    const { usernameErrMsg } = this.state;
    return (
      <FormElement
        name="username"
        rules={[
          'required:用户名称不能为空',
          'regexName:格式不正确(字母、数字、下划线, 16 位以内, 字母开头)',
        ]}
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
          {usernameErrMsg ? (
            <p className="help-block">{usernameErrMsg}</p>
          ) : null}
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
          {passwordErrMsg ? (
            <p className="help-block">{passwordErrMsg}</p>
          ) : null}
        </div>
      </FormElement>
    );
  }
  getSubmitErrAlert() {
    const { submitErr } = this.state;
    if (!submitErr) {
      return null;
    }
    return (
      <Alert type="danger" closeable>
        <strong>[{submitErr.status()}]</strong>&nbsp;{submitErr.message()}
      </Alert>
    );
  }
  getRegSuccessAlert() {
    const { regSuccess, email } = this.state;
    if (!regSuccess) {
      return null;
    }
    return (
      <Alert type="success">
        <strong>注册成功！</strong>&nbsp;请您到邮箱 {email} 点击验证链接!
      </Alert>
    );
  }
  getRegForm() {
    const { regSuccess } = this.state;
    if (regSuccess) {
      return null;
    }
    return (
      <Form
        onSubmit={(data, err) => {
          this.onSubmit(data, err, this);
        }}
        getElements={() => [this.refUsername, this.refEmail, this.refPassword]}
      >
        <div>
          {this.getUsernameField()}
          {this.getEmailField()}
          {this.getPasswordField()}
          <Button block buttonType="submit" type="primary">
            注册
          </Button>
        </div>
      </Form>
    );
  }
  render() {
    return (
      <div style={cls.wrapper} className="cls-container">
        <div className="cls-content">
          <div className="cls-content-lg panel">
            <div className="panel-body">
              <div className="mar-ver pad-btm">
                <h1 className="h3">从这里开始</h1>
                <p>注册一个新账户</p>
              </div>
              {this.getSubmitErrAlert()}
              {this.getRegSuccessAlert()}
              {this.getRegForm()}
            </div>
            <div className="pad-all bord-top">
              {/* <a
                href="pages-password-reminder.html"
                className="btn-link mar-rgt"
              >
                忘记密码 ?
              </a> */}
              <a href="/login" className="btn-link mar-lft">
                已有账号，这里登录
              </a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comp;

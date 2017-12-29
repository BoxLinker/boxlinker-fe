import React from 'react';
// import PropTypes from 'prop-types';
/* eslint-disable import/no-unresolved, import/extensions */
import { Form, Alert, FieldInput } from 'bui';
import bFetch from 'bfetch';
import { API } from 'const';
import cls from './style';

const logger = console;

class Comp extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      emailErrMsg: '',
      sendSuccess: false,
      sendErr: null,
    };
  }
  onSubmit = async (data, err, that) => {
    if (err) {
      return;
    }
    try {
      that.setState({
        sendSuccess: false,
        sendErr: null,
      });
      const res = await bFetch(API.USER.SEND_RESET_PASS_EMAIL, {
        method: 'POST',
        body: JSON.stringify(data),
      });
      logger.log('login res:>', res);
      that.setState({
        sendSuccess: true,
        sendErr: null,
      });
    } catch (e) {
      that.setState({
        sendSuccess: false,
        sendErr: e,
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
      case 'email':
        this.setState({
          username: v,
        });
        this.refEmail.validate();
        break;
      default:
    }
  };
  getEmailField() {
    return (
      <FieldInput
        ref={ref => {
          this.refEmail = ref;
        }}
        label="邮箱"
        name="email"
        required
        type="email"
      />
    );
  }
  getSendSuccessAlert() {
    const { sendSuccess, sendErr, email } = this.state;
    if (sendErr) {
      return (
        <Alert type="danger">
          发送失败: <strong>[{sendErr.status()}]</strong>&nbsp;{sendErr.message()}
        </Alert>
      );
    }
    if (sendSuccess) {
      return <Alert type="success">已向 {email} 发送了确认邮件，请查收!</Alert>;
    }
    return null;
  }
  render() {
    return (
      <div style={cls.wrapper} className="cls-container">
        <div className="cls-content">
          <div className="cls-content-sm panel">
            <div className="panel-body">
              <div className="mar-ver pad-btm">
                <h1 className="h3">忘记密码了？</h1>
                <p>请发送验证邮件到您的邮箱</p>
              </div>
              {this.getSendSuccessAlert()}
              <Form
                onSubmit={(data, err) => {
                  this.onSubmit(data, err, this);
                }}
                getElements={() => [this.refEmail.getRefElement()]}
              >
                <div>
                  {this.getEmailField()}
                  <button
                    className="btn btn-primary btn-lg btn-block"
                    type="submit"
                  >
                    发送
                  </button>
                </div>
              </Form>
            </div>
            <div className="pad-all bord-top">
              <a href="/login" className="btn-link mar-rgt">
                已有账号？请登录
              </a>
              {/* <a href="/reg" className="btn-link mar-lft">
                创建新账户
              </a> */}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Comp;

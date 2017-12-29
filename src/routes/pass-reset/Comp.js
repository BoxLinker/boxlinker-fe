import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable import/no-unresolved, import/extensions */
import { Form, Alert, Button } from 'bui';
import bFetch from 'bfetch';
import { API } from 'const';
import FieldInput from './FieldInput';
import cls from './style';

// const logger = console;

class Comp extends React.Component {
  static contextTypes = {
    getUrlParameter: PropTypes.func,
  };
  constructor(props) {
    super(props);
    this.state = {
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
      const res = await bFetch(API.USER.RESET_PASS, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
          'X-Access-Token': that.context.getUrlParameter('access_token'),
        },
      });
      console.log('login res:>', res); // eslint-disable-line
      that.setState({
        sendSuccess: true,
        sendErr: null,
      });
    } catch (sendErr) {
      that.setState({
        sendSuccess: false,
        sendErr,
      });
    }
  };
  getNewPassField() {
    return (
      <FieldInput
        ref={ref => {
          this.refNewPass = ref;
        }}
        label="新密码"
        name="new_password"
        required
        type="password"
      />
    );
  }
  getConfirmPassField() {
    return (
      <FieldInput
        ref={ref => {
          this.refConfirmPass = ref;
        }}
        label="确认密码"
        name="confirm_password"
        required
        type="password"
        rules={[
          val => {
            const newPassVal = this.refNewPass.getValue();
            return new Promise((resolve, reject) => {
              if (newPassVal === val) {
                resolve(val);
              } else {
                reject('两次新密码不一样');
              }
            });
          },
        ]}
      />
    );
  }
  getNotifyAlert() {
    const { sendErr, sendSuccess } = this.state;
    if (sendErr) {
      return (
        <Alert type="danger" closeable>
          <strong>[{sendErr.status()}]</strong>&nbsp;{sendErr.message()}
        </Alert>
      );
    } else if (sendSuccess) {
      return (
        <Alert type="success" closeable>
          修改密码成功
        </Alert>
      );
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
                <h1 className="h3">重置密码</h1>
                <p>在这里您可以重置您的密码</p>
              </div>
              {this.getNotifyAlert()}
              <Form
                onSubmit={(data, err) => {
                  this.onSubmit(data, err, this);
                }}
                getElements={() => [
                  this.refNewPass.getRefElement(),
                  this.refConfirmPass.getRefElement(),
                ]}
              >
                <div>
                  {this.getNewPassField()}
                  {this.getConfirmPassField()}
                  <Button buttonType="submit" block type="primary">
                    确认
                  </Button>
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

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Alert, Button } from 'antd';
import ForgotForm from './form';
import { resetPassAction } from '../../actions/auth';
import { getUrlParameter } from '../../utils';
import './style.css';
//reg_confirmed_username
class Comp extends React.Component {
  static displayName = 'Forgot';
  state = {
    loading: false,
    err: null,
    hasSent: false,
  };
  onSubmit = async data => {
    this.setState({
      loading: true,
    });
    try {
      await resetPassAction(getUrlParameter('access_token'), data);
      this.setState({ err: null, loading: false, hasSent: true });
    } catch (err) {
      this.setState({ err, loading: false });
    }
  };

  getAlert() {
    const { err } = this.state;
    if (!err) return null;
    return (
      <Alert
        style={{ marginBottom: 20 }}
        message={`[${err.status()}] ${err.message()}`}
        type="error"
        closable
        onClose={() => {
          this.setState({ err: null });
        }}
      />
    );
  }
  getForm() {
    const { loading, hasSent } = this.state;
    if (hasSent) {
      return (
        <div>
          <p>恭喜您修改密码成功！</p>
          <p>
            <Button
              type="primary"
              htmlType="button"
              className="login-form-button"
              style={{ width: '100%' }}
              onClick={() => {
                this.props.navigateTo('/login');
              }}
            >
              去登录
            </Button>
          </p>
        </div>
      );
    }
    return (
      <ForgotForm
        hasSent={hasSent}
        loading={loading}
        onSubmit={this.onSubmit}
      />
    );
  }
  render() {
    return (
      <div className="login-pack">
        <div
          style={{
            margin: '0 auto',
            width: 300,
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Boxlinker</h1>
          <p style={{ textAlign: 'center' }}>忘记密码</p>
          {this.getAlert()}
          {this.getForm()}
        </div>
      </div>
    );
  }
}
const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

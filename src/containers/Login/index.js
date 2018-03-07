import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Alert } from 'antd';
import LoginForm from './form';
import { login } from '../../actions/auth';
import { getUrlParameter } from '../../utils';
import './style.css';
//reg_confirmed_username
class Comp extends React.Component {
  static displayName = 'Login';
  state = {
    loading: false,
    err: null,
  };
  onSubmit = async data => {
    this.setState({
      loading: true,
    });
    try {
      await login(data);
      this.setState({ err: null, loading: false }, () => {
        this.props.navigateTo('/');
      });
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
  getLoginSuccessAlert() {
    const name = getUrlParameter('reg_confirmed_username');

    if (!name) {
      return null;
    }
    return (
      <Alert
        style={{ marginBottom: 20 }}
        message={
          <div>
            恭喜 <strong>{name}</strong> 注册成功，请登录！
          </div>
        }
        type="success"
      />
    );
  }
  render() {
    const { loading } = this.state;
    return (
      <div className="login-pack">
        <div
          style={{
            margin: '0 auto',
            width: 300,
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Boxlinker</h1>
          <p style={{ textAlign: 'center' }}>从这里开始，请登录您的账号</p>
          {this.getLoginSuccessAlert()}
          {this.getAlert()}
          <LoginForm loading={loading} onSubmit={this.onSubmit} />
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

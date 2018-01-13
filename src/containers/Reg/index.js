import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Alert } from 'antd';
import RegForm from './form';
import { reg } from '../../actions/auth';

class Comp extends React.Component {
  static displayName = 'Login';
  state = {
    loading: false,
    err: null,
    confirm: null,
  };
  onSubmit = async data => {
    this.setState({
      loading: true,
    });
    try {
      await reg(data);
      this.setState({ err: null, loading: false }, () => {
        this.setState({
          confirm: data,
        });
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
  getConfirm() {
    const { confirm } = this.state;
    if (!confirm) {
      return null;
    }
    return (
      <Alert
        style={{ marginBottom: 20 }}
        message={
          <div>
            <span>验证邮件已经发送到您的邮箱</span>
            <a>{confirm.email}</a>
            <br />请您到邮箱点击验证链接
          </div>
        }
        type="success"
      />
    );
  }
  render() {
    const { loading, confirm } = this.state;
    return (
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          marginLeft: '-150px',
          marginTop: '-265px',
        }}
      >
        <div
          style={{
            margin: '0 auto',
            width: 300,
          }}
        >
          <h1 style={{ textAlign: 'center' }}>Boxlinker</h1>
          <p style={{ textAlign: 'center' }}>从这里开始，注册一个账号</p>
          {this.getConfirm()}
          {this.getAlert()}
          <RegForm
            disabled={confirm !== null}
            loading={loading}
            onSubmit={this.onSubmit}
          />
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

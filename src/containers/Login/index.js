import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Alert } from 'antd';
import LoginForm from './form';
import { login } from '../../actions/auth';

class Comp extends React.Component {
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
      this.setState({ err: null }, () => {
        this.props.navigateTo('/');
      });
    } catch (err) {
      this.setState({ err });
    }
    this.setState({ loading: false });
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
  render() {
    const { loading } = this.state;
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
          <p style={{ textAlign: 'center' }}>从这里开始，请登录您的账号</p>
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

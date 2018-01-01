class LoginContainer extends React.Component {
  render() {
    return <button onClick={this.props.login}>Login Here!</button>
  }
}

const Login = connect(null, dispatch => ({
  login: () => {
    dispatch(authSuccess())
    dispatch(push('/'))
  }
}))(LoginContainer)
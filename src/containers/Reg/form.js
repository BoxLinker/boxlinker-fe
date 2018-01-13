import React from 'react';
import PropTypes from 'prop-types';
import { Form, Icon, Input, Button, Checkbox } from 'antd';
import { Link } from 'react-router';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  static displayName = 'LoginForm';
  static propTypes = {
    disabled: PropTypes.bool,
  };
  static defaultProps = {
    disabled: false,
  };
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.onSubmit(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { loading, disabled } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('username', {
            rules: [{ required: true, message: '请输入用户名' }],
          })(
            <Input
              disabled={disabled}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="用户名"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('email', {
            rules: [{ required: true, message: '请输入邮箱' }],
          })(
            <Input
              disabled={disabled}
              prefix={
                <Icon type="email" style={{ color: 'rgba(0,0,0,.25)' }} />
              }
              placeholder="邮箱"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('password', {
            rules: [{ required: true, message: '请输入密码' }],
          })(
            <Input
              disabled={disabled}
              prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
              type="password"
              placeholder="密码"
            />,
          )}
        </FormItem>
        <FormItem>
          <Button
            disabled={disabled}
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
            loading={loading}
          >
            注册
          </Button>
          已经有账号了? <Link to="/login">现在登录!</Link>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);

import React from 'react';
import { Form, Icon, Input, Button } from 'antd';

const FormItem = Form.Item;

class NormalLoginForm extends React.Component {
  static displayName = 'LoginForm';
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
    const { loading, hasSent } = this.props;
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormItem>
          {getFieldDecorator('old_password', {
            rules: [{ required: true, message: '请输入原始密码' }],
          })(
            <Input
              type="password"
              readOnly={hasSent}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入原始密码"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('new_password', {
            rules: [{ required: true, message: '请输入新密码' }],
          })(
            <Input
              type="password"
              readOnly={hasSent}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请输入新密码"
            />,
          )}
        </FormItem>
        <FormItem>
          {getFieldDecorator('confirm_password', {
            rules: [{ required: true, message: '请再输入一次新密码' }],
          })(
            <Input
              type="password"
              readOnly={hasSent}
              prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
              placeholder="请再输入一次新密码"
            />,
          )}
        </FormItem>
        <FormItem>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
            style={{ width: '100%' }}
            loading={loading}
            disabled={hasSent}
          >
            提交
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(NormalLoginForm);

import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button } from 'antd';

const FormItem = Form.Item;

class Comp extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.string,
  };
  static defaultProps = {
    onSubmit: () => {},
    value: '',
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { value } = this.props;
    return (
      <Form layout="inline" onSubmit={this.onSubmit}>
        <FormItem label="镜像">
          {getFieldDecorator('image', {
            rules: [{ required: true, message: '请选择镜像!' }],
            initialValue: value,
          })(<Input style={{ width: '360px' }} />)}
        </FormItem>
        <FormItem>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Comp);

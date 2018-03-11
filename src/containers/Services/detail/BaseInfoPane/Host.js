import React from 'react';
import PropTypes from 'prop-types';
import { Form, Button, Input } from 'antd';

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
        <FormItem label="绑定域名">
          {getFieldDecorator('host', {
            rules: [],
            initialValue: value,
          })(<Input placeholder="这里输入域名" />)}
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

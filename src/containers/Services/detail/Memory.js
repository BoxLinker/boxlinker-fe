import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button } from 'antd';

const FormItem = Form.Item;
const { Option } = Select;

class Comp extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    onSubmit: () => {},
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
    return (
      <Form layout="inline" onSubmit={this.onSubmit}>
        <FormItem label="内存">
          {getFieldDecorator('memory', {
            rules: [{ required: true, message: '请选择内存大小!' }],
            initialValue: 'lucy',
          })(
            <Select onChange={this.onAppMemoryChange}>
              <Option value="jack">Jack</Option>
              <Option value="lucy">Lucy</Option>
              <Option value="disabled">Disabled</Option>
              <Option value="Yiminghe">yiminghe</Option>
            </Select>,
          )}
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

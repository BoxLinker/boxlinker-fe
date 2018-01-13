import React from 'react';
import PropTypes from 'prop-types';
import { Form, Select, Button } from 'antd';
import { MemoryConfig } from '../../../../const';

const FormItem = Form.Item;
const { Option } = Select;

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
        <FormItem label="内存">
          {getFieldDecorator('memory', {
            rules: [{ required: true, message: '请选择内存大小!' }],
            initialValue: value,
          })(
            <Select
              onChange={this.onAppMemoryChange}
              style={{ width: '100px' }}
            >
              {MemoryConfig.map((item, i) => (
                <Option key={i} value={item.value}>
                  {item.label}
                </Option>
              ))}
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

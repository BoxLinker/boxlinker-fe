import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';
import PortsItem from './PortsItem';

const FormItem = Form.Item;

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
      <Form onSubmit={this.onSubmit}>
        <FormItem label="端口">
          {getFieldDecorator('ports', {
            rules: [{ required: true, message: '请填写端口!' }],
            initialValue: [{ key: '0', port: 80, protocol: 'tcp', path: '/' }],
          })(<PortsItem />)}
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Comp);

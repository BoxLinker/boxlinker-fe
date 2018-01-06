import React from 'react';
import { Form, Row, Col, Input, Icon, Select } from 'antd';

const { Option } = Select;
const FormItem = Form.Item;

class CreateForm extends React.Component {
  onAppMemoryChange = () => {};
  onAppImageChange = () => {};
  submit = () => {};
  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      <Form>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="服务名称">
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写应用名称!' }],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  placeholder="16 位字母数字，字母头"
                />,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="内存大小">
              {getFieldDecorator('memory', {
                rules: [{ required: true, message: '请选择内存大小!' }],
              })(
                <Select defaultValue="lucy" onChange={this.onAppMemoryChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="镜像">
              {getFieldDecorator('image', {
                rules: [{ required: true, message: '请选择镜像!' }],
              })(
                <Select defaultValue="lucy" onChange={this.onAppImageChange}>
                  <Option value="jack">Jack</Option>
                  <Option value="lucy">Lucy</Option>
                  <Option value="disabled">Disabled</Option>
                  <Option value="Yiminghe">yiminghe</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(CreateForm);

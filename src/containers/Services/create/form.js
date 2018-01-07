import React from 'react';
import { Form, Row, Col, Input, Icon, Select, Modal } from 'antd';
import PortsItem from './ports';

const { Option } = Select;
const FormItem = Form.Item;

// class CreateForm extends React.Component {
//   onAppMemoryChange = () => {};
//   onAppImageChange = () => {};
//   onAppPortsChange = () => {};
//   submit = () => {};
//   render() {}
// }

export default Form.create()(props => {
  const { visible, form, onCreate, onCancel } = props;
  const { getFieldDecorator } = form;
  const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
  };
  return (
    <Modal
      width={640}
      title="新建服务"
      visible={visible}
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form layout="horizontal">
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="服务名称" {...formItemLayout}>
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
            <FormItem label="内存大小" {...formItemLayout}>
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
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="镜像" {...formItemLayout}>
              {getFieldDecorator('image', {
                rules: [{ required: true, message: '请选择镜像!' }],
                initialValue: 'lucy',
              })(
                <Select onChange={this.onAppImageChange}>
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
            <FormItem label="端口" {...formItemLayout}>
              {getFieldDecorator('ports', {
                rules: [],
                initialValue: [
                  { key: '0', port: 80, protocol: 'tcp', path: '/' },
                ],
              })(<PortsItem onChange={this.onAppPortsChange} />)}
            </FormItem>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
});

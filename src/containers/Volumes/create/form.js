import React from 'react';
import { Form, Row, Col, Input, Icon, Select, Modal } from 'antd';

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
      width={480}
      title="新建数据卷"
      visible={visible}
      onOk={onCreate}
      onCancel={onCancel}
    >
      <Form layout="horizontal">
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写数据卷名称!' }],
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
            <FormItem label="大小" {...formItemLayout}>
              {getFieldDecorator('size', {
                rules: [{ required: true, message: '请选择数据卷大小!' }],
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
      </Form>
    </Modal>
  );
});

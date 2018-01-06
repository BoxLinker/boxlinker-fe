import React from 'react';
import { Form, Col, Row, Input, Icon, Button } from 'antd';

const FormItem = Form.Item;

class ServiceForm extends React.Component {
  render() {
    const { getFieldDecorator } = this.props.form; //eslint-disable-line
    return (
      <Form>
        <Row>
          <Col>
            <FormItem>
              {getFieldDecorator('appName', {
                rules: [{ required: true, message: '应用名称不能为空' }],
              })(
                <Input
                  prefix={
                    <Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />
                  }
                  type="text"
                  placeholder="服务名称"
                />,
              )}
            </FormItem>
            <FormItem>
              <Button type="primary" htmlType="submit">
                提交
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

export default Form.create()(ServiceForm);

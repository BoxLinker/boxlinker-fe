import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Icon, Select, Button, message } from 'antd';
import { push } from 'react-router-redux';

import { API } from '../../../const';
import bFetch from '../../../bfetch';
import PortsItem from './ports';

const logger = console;
const { Option } = Select;
const FormItem = Form.Item;
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 4,
    },
  },
};

const filterValues = values => {
  const { ports } = values;
  const p = ports.map(item => {
    return {
      ...item,
      name: `p-${item.port}`,
      port: parseInt(item.port, 10),
      is_private: item.is_private === '1',
    };
  });
  return {
    ...values,
    ports: p,
  };
};
const isPortDuplicated = ports => {
  const arr = [];
  for (let i = 0; i < ports.length; i++) {
    const port = ports[i];
    if (arr.indexOf(port.port) >= 0) {
      return true;
    } else {
      arr.push(port.port);
    }
  }
  return false;
};
class Comp extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
  };
  static defaultProps = {
    onSubmit: () => {},
  };
  state = {
    visible: false,
    loading: false,
  };
  createService = async data => {
    const result = {};
    try {
      data.cpu = '200m';
      result.res = await bFetch(API.SERVICE.CREATE, {
        method: 'post',
        body: JSON.stringify(data),
      });
    } catch (err) {
      result.err = err;
    }
    return result;
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (fErr, values) => {
      if (fErr) {
        return;
      }
      const data = filterValues(values);
      if (isPortDuplicated(data.ports)) {
        message.error('端口不能重复');
        return;
      }
      logger.log('create service data: ', data);
      this.setState({ loading: true });
      const { err, res } = await this.createService(data);
      this.setState({ loading: false });
      if (err) {
        message.error(err.error());
        logger.error('create service', {
          err,
        });
        return;
      }
      message.success(`服务 [${data.name}] 创建成功!`);
      logger.log('create service', { res });
      this.props.navigateTo(`/services/${data.name}`);
    });
  };
  render() {
    const { form } = this.props;
    const { loading } = this.state;
    const { getFieldDecorator } = form;
    return (
      <Form
        onSubmit={this.onSubmit}
        layout="horizontal"
        style={{ maxWidth: '1200px' }}
      >
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="服务名称" {...formItemLayout}>
              {getFieldDecorator('name', {
                rules: [{ required: true, message: '请填写应用名称!' }],
                initialValue: 'ci-server',
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
                initialValue: '64Mi',
              })(
                <Select onChange={this.onAppMemoryChange}>
                  <Option value="64Mi">64M</Option>
                  <Option value="128Mi">128M</Option>
                  <Option value="256Mi">256M</Option>
                  <Option value="512Mi">512M</Option>
                </Select>,
              )}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="镜像" {...formItemLayout}>
              {getFieldDecorator('image', {
                rules: [{ required: true, message: '请输入镜像!' }],
                initialValue:
                  'index.boxlinker.com/boxlinker/boxci-server:v0.1-dev-0-g1553276',
              })(<Input placeholder="这里输入镜像名称" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="绑定域名" {...formItemLayout}>
              {getFieldDecorator('host', {
                rules: [{ required: true, message: '请输入域名!' }],
                initialValue: 'api.boxlinker.com',
              })(<Input placeholder="这里输入域名" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="端口" {...formItemLayout}>
              {getFieldDecorator('ports', {
                rules: [],
                initialValue: [
                  {
                    key: '0',
                    port: 80,
                    protocol: 'HTTP',
                    path: '/',
                    is_private: '1',
                  },
                ],
              })(<PortsItem />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem {...tailFormItemLayout}>
              <Button type="primary" htmlType="submit" loading={loading}>
                提交
              </Button>
            </FormItem>
          </Col>
        </Row>
      </Form>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Form.create()(Comp));

export default Container;

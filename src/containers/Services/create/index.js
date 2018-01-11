import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Form, Row, Col, Input, Icon, Select, Button } from 'antd';
import { push } from 'react-router-redux';

import CreateForm from './form';
import { API } from '../../../const';
import bFetch from '../../../bfetch';
import PortsItem from './ports';

const logger = console;
const { Option } = Select;
const FormItem = Form.Item;
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
    try {
      await bFetch(API.SERVICE.CREATE, {
        method: 'post',
        body: JSON.stringify(data),
      });
      return null;
    } catch (err) {
      return err;
    }
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields(async (err, values) => {
      if (err) {
        return;
      }
      this.setState({ loading: true });
      const eErr = await this.createService(values);
      if (!eErr) {
        this.setState({ loading: false });
        // 跳转 service list
        this.props.navigateTo('/services');
        return;
      }
      logger.error('create service', {
        err: eErr,
      });
      // toast err
    });
  };
  createService = async data => {
    try {
      await bFetch(API.SERVICE.CREATE, {
        method: 'post',
        body: JSON.stringify(data),
      });
      return true;
    } catch (err) {
      logger.error('Service create', {
        err,
      });
    }
    return false;
  };
  render() {
    const { form } = this.props;
    const { loading } = this.state;
    const { getFieldDecorator } = form;
    // const formItemLayout = {
    //   labelCol: { span: 4 },
    //   wrapperCol: { span: 20 },
    // };
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
                initialValue: 'nginx-test',
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
                initialValue: '1',
              })(
                <Select onChange={this.onAppMemoryChange}>
                  <Option value="1">64M</Option>
                  <Option value="2">128M</Option>
                  <Option value="3">256M</Option>
                  <Option value="4">512M</Option>
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
                initialValue: 'index.boxlinker.com/library/nginx:latest',
              })(<Input placeholder="这里输入镜像名称" />)}
            </FormItem>
          </Col>
        </Row>
        <Row gutter={16}>
          <Col span={24}>
            <FormItem label="端口" {...formItemLayout}>
              {getFieldDecorator('ports', {
                rules: [],
                initialValue: [
                  { key: '0', port: 80, protocol: 'http', path: '/' },
                ],
              })(<PortsItem onChange={this.onAppPortsChange} />)}
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

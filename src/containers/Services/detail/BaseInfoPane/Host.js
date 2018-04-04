import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input } from 'antd';
import Button from '../../../../components/Button';
import { API } from '../../../../const';

const FormItem = Form.Item;

class Comp extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.object,
  };
  static defaultProps = {
    onSubmit: () => {},
    value: null,
  };
  state = {
    loading: false,
  };
  onSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log('values => ', values);
      }
    });
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const { value } = this.props;
    const { host, origin_host } = value;
    const { loading } = this.state;
    return (
      <Form layout="inline" onSubmit={this.onSubmit}>
        <FormItem label="绑定域名">
          {getFieldDecorator('host', {
            rules: [],
            initialValue: host,
          })(<Input style={{ width: '360px' }} placeholder="这里输入域名" />)}
        </FormItem>
        <FormItem>
          <Button loading={loading} type="primary" htmlType="submit">
            保存
          </Button>
        </FormItem>
        <FormItem label="原始域名">
          <span>{origin_host}</span>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Comp);

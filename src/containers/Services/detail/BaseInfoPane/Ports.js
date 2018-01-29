import React from 'react';
import PropTypes from 'prop-types';
import { Form, Input, Button, Icon, Table } from 'antd';

const FormItem = Form.Item;

const EditableCell = ({ value, onChange, type, record }) => {
  console.log('record', record);
  switch (type) {
    case 'input':
      return (
        <FormItem validateStatus="" help="" style={{ marginBottom: 0 }}>
          <Input value={value} onChange={e => onChange(e.target.value)} />
        </FormItem>
      );
    default:
      return null;
  }
};

class Comp extends React.Component {
  static propTypes = {
    onSubmit: PropTypes.func,
    value: PropTypes.arrayOf(
      PropTypes.shape({
        key: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        port: PropTypes.number,
        protocol: PropTypes.string,
        path: PropTypes.string,
      }),
    ),
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onSubmit: () => {},
    value: [],
    onChange: () => {},
  };
  static displayName = 'PortsItem';
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '端口',
        dataIndex: 'port',
        key: 'port',
        render: (text, record) => (
          <FormItem
            style={{ marginBottom: 0 }}
            validateStatus={record.portErr ? 'error' : ''}
            help={record.portErr}
          >
            <Input
              value={text}
              onChange={({ target: { value } }) =>
                this.handleChange(value, record.key, 'port')
              }
            />
          </FormItem>
        ),
        // render: (text, record) =>
        //   this.renderColumn(text, record, 'port', 'input'),
      },
      {
        title: '协议',
        dataIndex: 'protocol',
        key: 'protocol',
        width: 70,
        render: text => (text ? text.toUpperCase() : ''),
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
        render: (text, record) => (
          <FormItem
            style={{ marginBottom: 0 }}
            validateStatus={record.pathErr ? 'error' : ''}
            help={record.pathErr}
          >
            <Input
              value={text}
              onChange={({ target: { value } }) =>
                this.handleChange(value, record.key, 'path')
              }
            />
          </FormItem>
        ),
        render1: (text, record) =>
          this.renderColumn(text, record, 'path', 'input'),
      },
      {
        title: '操作',
        key: 'operate',
        width: 80,
        render: (text, record) => {
          const { value } = this.state;
          if (value.length === 1) {
            return null;
          }
          return (
            <Button
              onClick={() => {
                this.removeRow(record.key);
              }}
            >
              <Icon type="minus" />
            </Button>
          );
        },
      },
    ];
    const value = this.props.value || [];
    this.state = { value, count: value.length };
  }
  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const value = nextProps.value;
      this.setState(value);
    }
  }
  addRow = () => {
    const { value, count } = this.state;
    value.push({ key: count + 1, port: '', protocol: 'tcp', path: '/' });
    this.setState({ value, count: count + 1 });
  };
  removeRow = key => {
    const value = [...this.state.value];
    this.setState({ value: value.filter(item => item.key !== key) });
  };
  handleChange(value, key, column) {
    const ds = [...this.state.value];
    for (let i = 0; i < ds.length; i += 1) {
      const item = ds[i];
      if (item.key === key) {
        item[column] = value;
      }
    }
    this.setState({
      value: ds,
    });

    this.setState({ value: ds });
    if (this.checkPorts()) {
      this.props.onChange(ds);
    }
  }
  renderColumn(text, record, column, type) {
    return (
      <EditableCell
        record={record}
        type={type}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  onSubmit = e => {
    e.preventDefault();
    if (!this.checkPorts()) {
      return;
    }
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.props.onSubmit(values);
      }
    });
  };
  checkPorts = () => {
    const { value } = this.state;
    const portsHistory = [];
    let success = true;
    value.forEach(item => {
      if (portsHistory.indexOf(item.port) >= 0) {
        item.portErr = '端口重复';
        success = false;
      } else if (!item.port || isNaN(item.port)) {
        item.portErr = '端口必须填写, 且必须为数字';
        success = false;
      } else {
        item.portErr = '';
      }
      if (!item.path.startsWith('/')) {
        item.pathErr = '路径必须以 / 开头';
        success = false;
      } else {
        item.pathErr = '';
      }
    });
    this.setState({ value });
    return success;
  };
  render() {
    return (
      <Form onSubmit={this.onSubmit}>
        <FormItem label="端口">
          <Table
            rowKey="key"
            bordered
            pagination={false}
            columns={this.columns}
            dataSource={this.state.value}
          />
          <p>
            <Button onClick={this.addRow} style={{ marginRight: 15 }}>
              <Icon type="plus" />添加端口
            </Button>
            <Button type="primary" htmlType="submit">
              保存
            </Button>
          </p>
        </FormItem>
      </Form>
    );
  }
}

export default Form.create()(Comp);

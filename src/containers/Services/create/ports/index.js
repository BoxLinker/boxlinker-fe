import React from 'react';
import { Table, Input, Button, Icon, Select } from 'antd';

const { Option } = Select;
const EditableCell = ({ value, onChange, type }) => {
  switch (type) {
    case 'input':
      return <Input value={value} onChange={e => onChange(e.target.value)} />;
    default:
      return null;
  }
};

export default class extends React.Component {
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '端口',
        dataIndex: 'port',
        key: 'port',
        render: (text, record) =>
          this.renderColumn(
            isNaN(text) ? 0 : parseInt(text || 0, 10),
            record,
            'port',
            'input',
          ),
      },
      {
        title: '协议',
        dataIndex: 'protocol',
        key: 'protocol',
        width: 120,
        render: (text, record) => {
          return (
            <Select
              defaultValue="HTTP"
              onChange={value => {
                this.handleChange(value, record.key, 'protocol');
              }}
            >
              <Option value="HTTP">HTTP</Option>
              <Option value="TCP">TCP</Option>
            </Select>
          );
        },
      },
      {
        title: '外网访问',
        dataIndex: 'is_private',
        key: 'is_private',
        width: 120,
        render: (text, record) => {
          return (
            <Select
              value={text}
              onChange={value => {
                this.handleChange(value, record.key, 'is_private');
              }}
            >
              <Option value="0">是</Option>
              <Option value="1">否</Option>
            </Select>
          );
        },
      },
      {
        title: '路径',
        dataIndex: 'path',
        key: 'path',
        render: (text, record) => {
          return (
            <Input
              disabled={record.is_private === '1'}
              value={text}
              onChange={({ target: { value } }) =>
                this.handleChange(value, record.key, 'path')
              }
            />
          );
        },
        // this.renderColumn(text, record, 'path', 'input'),
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
    this.state = { value, count: 0 };
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
    value.push({
      key: count + 1,
      port: 0,
      is_private: '1',
      protocol: 'HTTP',
      path: '/',
    });
    this.setState({ value, count: count + 1 });
    this.props.onChange(value);
  };
  removeRow = key => {
    const value = [...this.state.value];
    const ds = value.filter(item => item.key !== key);
    this.setState({ value: ds });
    this.props.onChange(ds);
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
    this.props.onChange(ds);
  }
  renderColumn(text, record, column, type) {
    return (
      <EditableCell
        type={type}
        value={text}
        onChange={value => this.handleChange(value, record.key, column)}
      />
    );
  }
  render() {
    return (
      <span>
        <Table
          rowKey="key"
          bordered
          pagination={false}
          columns={this.columns}
          dataSource={this.state.value}
        />
        <p>
          <Button onClick={this.addRow}>
            <Icon type="plus" />添加端口
          </Button>
        </p>
      </span>
    );
  }
}

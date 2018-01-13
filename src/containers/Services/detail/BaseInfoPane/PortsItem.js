import React from 'react';
import { Table, Input, Button, Icon } from 'antd';

const EditableCell = ({ value, onChange, type }) => {
  switch (type) {
    case 'input':
      return <Input value={value} onChange={e => onChange(e.target.value)} />;
    default:
      return null;
  }
};

export default class extends React.Component {
  static displayName = 'PortsItem';
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '端口',
        dataIndex: 'port',
        key: 'port',
        render: (text, record) =>
          this.renderColumn(text, record, 'port', 'input'),
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
        render: (text, record) =>
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
    console.log('PortsItem>>>', value);

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
          <Button onClick={this.addRow} style={{ marginRight: 15 }}>
            <Icon type="plus" />添加端口
          </Button>
          <Button type="primary" htmlType="submit">
            保存
          </Button>
        </p>
      </span>
    );
  }
}

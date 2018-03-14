import React from 'react';
import PropTypes from 'prop-types';
import { Input, Button, Icon, Table, Checkbox } from 'antd';

const defaultData = { hostPath: '', path: '', name: '', readonly: false };

export default class extends React.Component {
  static displayName = 'CreateServiceHostVolumes';
  static propTypes = {
    value: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        key: PropTypes.string,
        hostPath: PropTypes.string,
        path: PropTypes.string,
        readonly: PropTypes.bool,
      }),
    ),
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onChange: () => {},
  };
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '名称',
        dataIndex: 'name',
        key: 'name',
        render: (text, record) => {
          return (
            <Input
              value={text}
              onChange={e => {
                this.onChangeValue(e.target.value, record.key, 'name');
              }}
              placeholder="选填"
            />
          );
        },
      },
      {
        title: 'host 路径',
        dataIndex: 'hostPath',
        key: 'hostPath',
        render: (text, record) => {
          return (
            <Input
              value={text}
              onChange={e => {
                this.onChangeValue(e.target.value, record.key, 'hostPath');
              }}
              placeholder="路径不能为 /"
            />
          );
        },
      },
      {
        title: '容器路径',
        dataIndex: 'path',
        key: 'path',
        render: (text, record) => {
          return (
            <Input
              value={text}
              onChange={e => {
                this.onChangeValue(e.target.value, record.key, 'path');
              }}
              placeholder="路径不能为 /"
            />
          );
        },
      },
      {
        title: '是否只读',
        dataIndex: 'readonly',
        key: 'readonly',
        render: (text, record) => {
          return (
            <Checkbox
              checked={text}
              onChange={e => {
                this.onChangeValue(e.target.checked, record.key, 'readonly');
              }}
            />
          );
        },
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => {
          return (
            <Button
              onClick={() => {
                this.onDeleteValue(record.key);
              }}
            >
              <Icon type="minus" />
            </Button>
          );
        },
      },
    ];
    const value = this.props.value || [];
    this.state = { value };
  }
  onChangeValue = (v, key, column) => {
    const { value } = this.state;
    this.setState(
      {
        value: value.map(item => {
          if (item.key === key) {
            item[column] = v;
          }
          return item;
        }),
      },
      this.onChange,
    );
  };
  onDeleteValue = key => {
    const { value } = this.state;
    for (let i = 0; i < value.length; i += 1) {
      if (value[i].key === key) {
        value.splice(i, 1);
      }
    }
    this.setState(
      {
        value,
      },
      this.onChange,
    );
  };
  onChange = () => {
    this.props.onChange(this.state.value);
  };
  addRow = () => {
    this.setState(
      {
        value: []
          .concat(this.state.value || [])
          .concat([{ ...defaultData, key: `${this.count++}` }]),
      },
      this.onChange,
    );
  };
  count = 0;
  componentWillReceiveProps(nextProps) {
    if ('value' in nextProps) {
      const { value = [] } = nextProps;
      value.forEach(item => {
        if (!item.key) {
          item.key = `${this.count++}`;
        }
      });
      this.setState({ value });
    }
  }
  render() {
    const { value } = this.state;
    return (
      <span>
        <Table
          pagination={false}
          bordered
          dataSource={value}
          columns={this.columns}
        />
        <p>
          <Button onClick={this.addRow}>
            <Icon type="plus" />添加卷
          </Button>
        </p>
      </span>
    );
  }
}

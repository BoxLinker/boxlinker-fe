import React from 'react';
import PropTypes from 'prop-types';
import { List, Input, Button, Icon, Select, Col, Form } from 'antd';

const InputGroup = Input.Group;
const { Option } = Select;
const FormItem = Form.Item;

class ListItem extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      key: PropTypes.string,
      type: PropTypes.oneOf(['host', 'volume']).isRequired,
      volumeName: PropTypes.string,
      hostPath: PropTypes.string,
      path: PropTypes.string,
    }),
    onChange: PropTypes.func,
    onDelete: PropTypes.func,
  };
  static defaultProps = {
    onChange: () => {},
    onDelete: () => {},
  };
  onChangeValue = (v, attr, err) => {
    this.props.onChange({
      ...this.props.data,
      [attr]: v,
      [`${attr}Err`]: err,
    });
  };
  validate() {
    const { data } = this.props;
    if (data.type === 'host') {
      if (data.hostPath === '/') {
        data.hostPathErr = '路径不能为 /';
      }
    } else {
      if (data.volumeName === '') {
        data.volumeNameErr = '必须选择一个数据卷';
      }
    }
    if (data.path === '/') {
      data.pathErr = '路径不能为 /';
    }
    this.props.onChange({
      ...data,
    });
  }
  render() {
    const { data } = this.props;
    return (
      <List.Item>
        <InputGroup>
          <Col span={6}>
            <Select
              style={{ width: '100%', verticalAlign: 'top' }}
              value={data.type}
              onChange={v => {
                this.onChangeValue(v, 'type');
              }}
            >
              <Option value="host">Host</Option>
              <Option value="volume">数据卷</Option>
            </Select>
          </Col>
          <Col span={8}>
            {data.type === 'host' ? (
              <FormItem
                help={data.hostPathErr}
                validateStatus={data.hostPathErr ? 'error' : ''}
              >
                <Input
                  style={{ width: '100%', verticalAlign: 'top' }}
                  placeholder="host 目录或文件路径, 不能为 /"
                  value={data.hostPath}
                  onChange={e => {
                    const value = e.target.value;
                    let errMsg = '';
                    if (value.trim() === '/') {
                      errMsg = '路径不能为 /';
                    }
                    this.onChangeValue(e.target.value, 'hostPath', errMsg);
                  }}
                />
              </FormItem>
            ) : (
              <FormItem
                help={data.volumeNameErr}
                validateStatus={data.volumeNameErr ? 'error' : ''}
              >
                <Select
                  style={{ width: '100%', verticalAlign: 'top' }}
                  value={data.volumeName}
                  onChange={v => {
                    this.onChangeValue(
                      v,
                      'volumeName',
                      !v ? '必须选择一个数据卷' : '',
                    );
                  }}
                >
                  <Option value="">未选择</Option>
                  <Option value="vol1">Vol1</Option>
                  <Option value="vol2">Vol2</Option>
                </Select>
              </FormItem>
            )}
          </Col>
          <Col span={8}>
            <FormItem>
              <Input
                style={{ width: '100%', verticalAlign: 'top' }}
                placeholder="容器目录或文件路径, 不能为 /"
                onChange={e => {
                  const value = e.target.value;
                  let errMsg = '';
                  if (value.trim() === '/') {
                    errMsg = '路径不能为 /';
                  }
                  this.onChangeValue(e.target.value, 'path', errMsg);
                }}
                value={data.path}
              />
            </FormItem>
          </Col>
          <Col span={2}>
            <Button
              onClick={() => {
                this.props.onDelete(this.props.data);
              }}
            >
              <Icon type="minus" />
            </Button>
          </Col>
        </InputGroup>
      </List.Item>
    );
  }
}

const defaultData = { type: 'volume', volumeName: '', path: '' };

export default class extends React.Component {
  static displayName = 'CreateServiceVolumes';
  static propTypes = {
    value: PropTypes.arrayOf(ListItem.propTypes.data),
    onChange: PropTypes.func,
  };
  static defaultProps = {
    onChange: () => {},
  };
  state = {
    value: [],
  };
  onChangeValue = v => {
    const { value } = this.state;
    this.setState(
      {
        value: value.map(item => {
          if (item.key === v.key) {
            return v;
          } else {
            return item;
          }
        }),
      },
      this.onChange,
    );
  };
  onDeleteValue = v => {
    const { value } = this.state;
    for (let i = 0; i < value.length; i += 1) {
      if (value[i].key === v.key) {
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
  getItems() {
    const { value } = this.state;
    if (!value) {
      return null;
    }
    return value.map(item => (
      <ListItem
        key={item.key}
        data={item}
        onChange={this.onChangeValue}
        onDelete={this.onDeleteValue}
      />
    ));
  }
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
      const { value } = nextProps;
      value.forEach(item => {
        if (!item.key) {
          item.key = `${this.count++}`;
        }
      });
      this.setState({ value });
    }
  }
  render() {
    return (
      <span>
        <List split={false}>{this.getItems()}</List>
        <p>
          <Button onClick={this.addRow}>
            <Icon type="plus" />添加卷
          </Button>
        </p>
      </span>
    );
  }
}

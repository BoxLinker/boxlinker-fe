import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tag, Popover, message } from 'antd';
import { Link } from 'react-router';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import { API } from '../../../const';

class Operation extends React.Component {
  getBtns() {
    const { record = {} } = this.props;
    return (
      <div>
        <Button
          url={`${API.SERVICE.DELETE(record.name)}`}
          method="DELETE"
          onSuccess={() => {
            message.success('操作成功');
            this.props.onSuccess && this.props.onSuccess();
          }}
          onError={err => {
            message.error(`操作失败 ${err.message()}`);
          }}
          type="primary"
          size="small"
        >
          确定
        </Button>
        <Button onClick={this.hide} size="small" style={{ float: 'right' }}>
          取消
        </Button>
      </div>
    );
  }
  state = {
    visible: false,
  };
  hide = () => {
    this.setState({
      visible: false,
    });
  };
  handleVisibleChange = visible => {
    this.setState({ visible });
  };
  render() {
    return (
      <Popover
        trigger="click"
        content={this.getBtns()}
        title="确定删除吗？"
        visible={this.state.visible}
        onVisibleChange={this.handleVisibleChange}
      >
        <Button>删除</Button>
      </Popover>
    );
  }
}

class Comp extends React.Component {
  static displayName = 'Services';
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '服务名称',
        dataIndex: 'name',
        key: 'name',
        render: name => <Link to={`/services/${name}`}>{name}</Link>,
      },
      {
        title: '状态',
        dataIndex: 'status',
        key: 'status',
        render: () => <Tag color="green">运行中</Tag>,
      },
      {
        title: '访问域名',
        dataIndex: 'host',
        key: 'host',
        render: text => {
          if (!text) {
            return null;
          }
          if (!/^http:\/\/|https:\/\//.test(text)) {
            text = `http://${text}`;
          }
          return (
            <a href={text} target="_blank">
              {text}
            </a>
          );
        },
      },
      {
        title: '端口',
        dataIndex: 'ports',
        key: 'ports',
        render: (ports = []) =>
          ports.map((port, i) => (
            // eslint-disable-next-line
            <div key={i}>
              {`${port.port}/${(port.protocol || '').toUpperCase()} - ${
                port.path
              }`}
            </div>
          )),
      },
      {
        title: '操作',
        dataIndex: 'operate',
        key: 'operate',
        render: (text, record) => (
          <Operation
            record={record}
            onSuccess={() => {
              if (this.tableRef) {
                this.tableRef.reload();
              }
            }}
          />
        ),
      },
    ];
  }
  openCreate = () => {
    this.props.navigateTo('/services/create');
  };
  render() {
    return (
      <div>
        <Table
          refreshable
          tools={[
            <Button type="primary" onClick={this.openCreate}>
              新建服务
            </Button>,
          ]}
          rowKey="name"
          url={API.SERVICE.QUERY}
          columns={this.columns}
        />
      </div>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

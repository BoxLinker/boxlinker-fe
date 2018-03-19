import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tag } from 'antd';
import { Link } from 'react-router';
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import { API } from '../../../const';

const ButtonGroup = Button.Group;

const columns = [
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
          {`${port.port}/${(port.protocol || '').toUpperCase()} - ${port.path}`}
        </div>
      )),
  },
  {
    title: '操作',
    dataIndex: 'operate',
    key: 'operate',
    render: () => (
      <ButtonGroup>
        <Button ghost>开启</Button>
        <Button ghost>删除</Button>
      </ButtonGroup>
    ),
  },
];
class Comp extends React.Component {
  static displayName = 'Services';
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
          columns={columns}
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

import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { Tag } from 'antd';
import Table from '../../../components/Table';
import { API } from '../../../const';

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
];
class Comp extends React.Component {
  static displayName = 'ServiceList';
  render() {
    return <Table rowKey="name" url={API.SERVICE.QUERY} columns={columns} />;
  }
}

const Container = connect(null, dispatch => ({
  list: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

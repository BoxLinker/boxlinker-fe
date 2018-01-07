import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Table from '../../../components/Table';
import { API } from '../../../const';

const columns = [
  {
    title: '服务名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '镜像',
    dataIndex: 'image',
    key: 'image',
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

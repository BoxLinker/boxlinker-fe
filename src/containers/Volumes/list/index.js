import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Table from '../../../components/Table';
import { API } from '../../../const';

const columns = [
  {
    title: '数据卷名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '大小',
    dataIndex: 'size',
    key: 'size',
  },
];
class Comp extends React.Component {
  render() {
    return <Table rowKey="name" url={API.VOLUMES.QUERY} columns={columns} />;
  }
}

const Container = connect(null, dispatch => ({
  list: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

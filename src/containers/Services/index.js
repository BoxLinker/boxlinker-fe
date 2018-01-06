import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Table, Button } from 'antd';
import Layout from '../../components/Layout';

import CreateModal from './create';

const dataSource = [
  {
    key: '1',
    name: '胡彦斌',
    age: 32,
    address: '西湖区湖底公园1号',
  },
  {
    key: '2',
    name: '胡彦祖',
    age: 42,
    address: '西湖区湖底公园1号',
  },
];

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '年龄',
    dataIndex: 'age',
    key: 'age',
  },
  {
    title: '住址',
    dataIndex: 'address',
    key: 'address',
  },
];
class Comp extends React.Component {
  openCreate = () => {
    if (this.createRef) {
      this.createRef.toggle(true);
    }
  };
  render() {
    return (
      <Layout>
        <p>
          <Button type="primary" onClick={this.openCreate}>
            新建服务
          </Button>
        </p>
        <Table bordered dataSource={dataSource} columns={columns} />
        <CreateModal
          ref={ref => {
            this.createRef = ref;
          }}
        />
      </Layout>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Tag } from 'antd';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { API } from '../../../const';
import AddProjectModal from './modal';

const logger = console;

const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
    render: name => <Link to={`/cicd/github/${name}`}>{name}</Link>,
  },
  {
    title: '状态',
    dataIndex: 'status',
    key: 'status',
    render: () => <Tag color="green">运行中</Tag>,
  },
  {
    title: '代码仓库',
    dataIndex: 'scm',
    key: 'scm',
  },
  {
    title: '最近构建',
    dataIndex: 'lastBuilding',
    key: 'lastBuilding',
    render: () => {
      return (
        <span>
          <Tag>成功</Tag>, 用时 1 分 30 秒。
        </span>
      );
    },
  },
  {
    title: '操作',
    dataIndex: 'buildLast',
    key: 'buildLast',
    render: () => {
      return <Button>执行上一次构建</Button>;
    },
  },
];
class Comp extends React.Component {
  static displayName = 'CICDList';
  state = {
    showModal: false,
  };
  openModal = () => {
    this.setState({ showModal: true });
  };
  closeModal = () => {
    this.setState({ showModal: false });
  };
  render() {
    return (
      <div>
        <p>
          <Button type="primary" onClick={this.openModal}>
            添加项目
          </Button>
        </p>
        <Table rowKey="name" url={API.SERVICE.QUERY} columns={columns} />
        <AddProjectModal
          visible={this.state.showModal}
          onClose={this.closeModal}
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

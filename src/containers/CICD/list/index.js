import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Icon } from 'antd';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { API } from '../../../const';
import AddProjectModal from './modal';
import LastBuild from './LastBuild';
import bFetch from '../../../bfetch';

const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
    render: (name, record) => (
      <Link to={`/cicd/${record.scm}/${record.owner}/${name}`}>
        {`${record.scm}/${record.owner}/${name}`}
      </Link>
    ),
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
    render: (text, record) => {
      return <LastBuild data={record} />;
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
  onAddProject = (vcs, record) => {
    this.closeModal();
    this.tableRef.reload();
  };
  reload = () => {
    if (this.tableRef) {
      this.tableRef.reload({
        params: {
          flush: true,
        },
      });
    }
  };
  render() {
    return (
      <div>
        <p>
          <Button
            style={{ marginRight: 10 }}
            type="primary"
            onClick={this.openModal}
          >
            添加项目
          </Button>
          <Button onClick={this.reload}>
            <Icon type="reload" />
          </Button>
        </p>
        <Table
          ref={ref => {
            this.tableRef = ref;
          }}
          rowKey={record => `${record.scm}-${record.owner}-${record.name}`}
          url={API.CICD.REPOS('github')}
          params={{ active: true }}
          columns={columns}
        />
        <AddProjectModal
          onAddProject={this.onAddProject}
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

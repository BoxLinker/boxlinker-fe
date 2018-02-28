import React from 'react';
import { Modal, Tabs, Button } from 'antd';
import Table from '../../../components/Table';
import { API } from '../../../const';

const listData = [];

for (let i = 0; i < 0; i++) {
  listData.push({
    name: `name${i}`,
  });
}
const { TabPane } = Tabs;

const columns = [
  {
    title: '项目名称',
    dataIndex: 'name',
    key: 'name',
  },
  {
    title: '操作',
    dataIndex: 'status',
    key: 'status',
    render: (text, record) => (
      <Button
        onClick={() => {
          this.addProject(record.name);
        }}
      >
        添加
      </Button>
    ),
  },
];

class GithubTab extends React.Component {
  static displayName = 'CICDAddRepoGithubTab';
  state = {
    unauthorized: false,
  };
  getUnbound() {
    return (
      <div>
        <p>
          您还没有绑定 Github, 点击&nbsp;
          <a
            href="http://localhost:8083/v1/cicd/github/authorize"
            target="_blank"
            rel="noopener noreferrer"
          >
            这里
          </a>&nbsp; 绑定。
        </p>
        <p>
          已经绑定了？点击{' '}
          <Button size="small" onClick={this.refresh}>
            刷新
          </Button>{' '}
          试试。
        </p>
      </div>
    );
  }
  refresh = () => {
    this.setState({
      unauthorized: false,
    });
  };
  getList() {
    return (
      <Table
        size="small"
        ref={ref => {
          this.tableRef = ref;
        }}
        rowKey="name"
        url={API.CICD.REPOS('github')}
        params={{ active: false }}
        columns={columns}
        onLoad={this.onDataLoad}
      />
    );
  }
  onDataLoad = err => {
    this.setState({
      unauthorized: !!err,
    });
  };
  render() {
    const { unauthorized } = this.state;

    return unauthorized ? this.getUnbound() : this.getList();
  }
}

class Comp extends React.Component {
  static displayName = 'CICDAddRepoModal';
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClose}
        footer={false}
      >
        <Tabs defaultActiveKey="github">
          <TabPane key="github" tab="Github">
            <GithubTab />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Comp;

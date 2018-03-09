import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Tabs, Icon } from 'antd';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import { API } from '../../../const';

const { TabPane } = Tabs;

class GithubTab extends React.Component {
  static displayName = 'CICDAddRepoGithubTab';
  static propTypes = {
    onAddProject: PropTypes.func,
  };
  static defaultProps = {
    onAddProject: () => {},
  };
  constructor(props) {
    super(props);
    this.columns = [
      {
        title: '项目名称',
        dataIndex: 'full_name',
        key: 'full_name',
      },
      {
        title: '操作',
        dataIndex: 'status',
        key: 'status',
        render: (text, record) => (
          <Button
            url={API.CICD.POST_REPO('github', record.owner, record.name)}
            method="post"
            onSuccess={() => {
              this.props.onAddProject();
            }}
          >
            添加
          </Button>
        ),
      },
    ];
  }
  state = {
    unauthorized: false,
  };
  getUnbound() {
    return (
      <div>
        <p>
          您还没有绑定 Github, 点击&nbsp;
          <a
            href={API.CICD.BIND_VCS('github')}
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
        refreshable={true}
        size="small"
        ref={ref => {
          this.tableRef = ref;
        }}
        rowKey="full_name"
        url={API.CICD.REPOS('github')}
        params={{ active: false }}
        columns={this.columns}
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
  static propTypes = {
    onAddProject: PropTypes.func,
  };
  static defaultProps = {
    onAddProject: () => {},
  };
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClose}
        footer={false}
      >
        <Tabs defaultActiveKey="github">
          <TabPane key="github" tab="Github">
            <GithubTab onAddProject={this.props.onAddProject} />
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Comp;

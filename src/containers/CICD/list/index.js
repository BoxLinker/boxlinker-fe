import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Icon, Popover, message } from 'antd';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import Button from '../../../components/Button';
import { API } from '../../../const';
import AddProjectModal from './modal';
import LastBuild from './LastBuild';
import bFetch from '../../../bfetch';

class Operation extends React.Component {
  getBtns() {
    const { record = {} } = this.props;
    return (
      <div>
        <Button
          url={`${API.CICD.DELETE_REPO(record.scm, record.owner, record.name)}`}
          method="DELETE"
          onSuccess={() => {
            message.success('操作成功');
            this.props.onSuccess && this.props.onSuccess();
          }}
          onError={err => {
            message.error(`操作失败 ${err.message()}`);
          }}
        >
          确定
        </Button>
        <Button>取消</Button>
      </div>
    );
  }
  render() {
    return (
      <Popover trigger="click" content={this.getBtns()} title="确定删除吗？">
        <Button>删除</Button>
      </Popover>
    );
  }
}

class Comp extends React.Component {
  static displayName = 'CICDList';
  constructor(props) {
    super(props);
    this.columns = [
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
        render: (text, record) => {
          return (
            <Operation
              record={record}
              onSuccess={() => {
                if (this.tableRef) {
                  this.tableRef.reload();
                }
              }}
            />
          );
        },
      },
    ];
  }
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
        <Table
          ref={ref => {
            this.tableRef = ref;
          }}
          tools={[
            <Button
              style={{ marginRight: 10 }}
              type="primary"
              onClick={this.openModal}
            >
              添加项目
            </Button>,
          ]}
          refreshable
          rowKey={record => `${record.scm}-${record.owner}-${record.name}`}
          url={API.CICD.REPOS('github')}
          params={{ active: true }}
          columns={this.columns}
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

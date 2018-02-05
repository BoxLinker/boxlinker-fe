import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';
import bfetch from '../../../bfetch';
import { API } from '../../../const/index';

class BuildHistory5 extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  state = {
    list: null,
  };
  render() {
    const { name } = this.props.data;
    return (
      <List.Item extra={this.getBuildHistory()}>
        <List.Item.Meta title={name} />
        <Button type="primary">开始构建</Button>
      </List.Item>
    );
  }
  componentDidMount() {
    this.getBuilds5();
  }
  openBuildTab = item => {
    this.props.onOpenBuildTab(item);
  };
  async getBuilds5() {
    const branch = this.props.data.name;
    try {
      const { scm, owner, name } = this.props.repoData;
      const res = await bfetch(API.CICD.QUERY_BRANCH_BUILDS(scm, owner, name), {
        params: {
          branch,
        },
      });
      this.setState({
        list: res.results,
      });
    } catch (e) {
      console.error('getBuilds5 err: ', e);
    }
  }
  getBuildHistory() {
    const { list } = this.state;
    if (!list) {
      return <p>加载中...</p>;
    }
    const lis = list.map((item, i) => {
      const { number, branch, status } = item;
      return (
        <li className={`build-item ${status}`} key={number}>
          <a
            onClick={() => {
              this.openBuildTab({
                ...item,
                tab: `${branch}#${number}`,
              });
            }}
          >{`#${number}`}</a>
        </li>
      );
    });
    return <ul className="build-history5">{lis}</ul>;
  }
}

class Comp extends React.Component {
  static displayName = 'CICDBuildingBranch';
  static propTypes = {
    onOpenBuildTab: PropTypes.func,
  };
  static defaultProps = {
    onOpenBuildTab: () => {},
  };
  state = {
    branchList: null,
  };
  componentDidMount() {
    this.fetch();
  }
  async fetch() {
    const { scm, owner, name } = this.props.repoData || {};
    try {
      const res = await bfetch(API.CICD.QUERY_BRANCHES(scm, owner, name));
      this.setState({
        branchList: res.results.data,
      });
    } catch (e) {
      console.log('fetch branches err: ', e);
    }
  }
  getBuildHistory(branch) {}
  render() {
    const { branchList } = this.state;
    if (!branchList) {
      return <p>加载中...</p>;
    }
    return (
      <List
        bordered
        itemLayout="vertical"
        style={{ padding: '8px 0' }}
        dataSource={branchList}
        renderItem={item => (
          <BuildHistory5
            onOpenBuildTab={this.props.onOpenBuildTab}
            data={item}
            repoData={this.props.repoData}
          />
        )}
      >
        {/* 
        <List.Item extra={this.getBuildHistory('master')}>
          <List.Item.Meta title="master" />
          <Button type="primary">开始构建</Button>
        </List.Item>
        <List.Item extra={this.getBuildHistory('v0.1-dev-1-8d0djduyd')}>
          <List.Item.Meta title="v0.1-dev-1-8d0djduyd" />
          <Button type="primary">开始构建</Button>
        </List.Item> */}
      </List>
    );
  }
}

export default Comp;

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col, Tabs } from 'antd';

import { API } from '../../../const';

import BranchBuildTab from './BranchBuildTab';
import BuildingInfo from './InfoTab';
import BuildsHistory from './BuildHisotry';
import './style.css';
import bfetch from '../../../bfetch';

const { TabPane } = Tabs;

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
  state = {
    repoData: null,
    buildTabs: [],
    activeTab: 'lastBuild',
  };
  componentDidMount() {
    this.fetchRepo();
  }
  onPostBuild() {
    this.fetchRepo();
  }
  async fetchRepo() {
    const { scm, owner, name } = this.props.params;
    try {
      const res = await bfetch(API.CICD.GET_REPO(scm, owner, name));
      this.setState({ repoData: res.results });
    } catch (e) {
      console.error(e);
    }
  }
  getTabs() {
    const { activeTab, repoData } = this.state;
    if (!repoData) {
      return <p>加载中...</p>;
    }
    return (
      <Tabs
        hideAdd
        activeKey={activeTab}
        onChange={this.onTabChange}
        onEdit={this.onTabEdit}
        type="editable-card"
      >
        <TabPane tab="最近构建" key="lastBuild" closable={false}>
          <BuildingInfo repoData={repoData} refreshAble />
        </TabPane>
        <TabPane tab="分支构建" key="branch" closable={false}>
          <BranchBuildTab
            repoData={repoData}
            onOpenBuildTab={this.onOpenBuildTab}
          />
        </TabPane>
        {this.getBuildTabs()}
      </Tabs>
    );
  }
  getBuildTabs() {
    const { buildTabs, repoData } = this.state;
    return buildTabs.map(item => {
      return (
        <TabPane tab={item.tab} key={item.tab} closable={true}>
          <BuildingInfo repoData={repoData} buildData={item} />
        </TabPane>
      );
    });
  }
  onOpenBuildTab = data => {
    const { buildTabs } = this.state;
    for (let i = 0; i < buildTabs.length; i++) {
      if (buildTabs[i].tab === data.tab) {
        this.setState({ activeTab: data.tab });
        return;
      }
    }
    this.setState({
      activeTab: data.tab,
      buildTabs: [].concat(buildTabs).concat([data]),
    });
  };
  onTabChange = activeTab => {
    this.setState({ activeTab });
  };
  onTabEdit = (targetKey, action) => {
    const { buildTabs, activeTab } = this.state;
    let newActiveTab = activeTab;
    switch (action) {
      case 'remove':
        for (let i = 0; i < buildTabs.length; i++) {
          if (buildTabs[i].tab == targetKey) { //eslint-disable-line
            buildTabs.splice(i, 1);
            if (activeTab === targetKey) {
              if (i === 0) {
                newActiveTab = 'branch';
              } else if (buildTabs[i - 1]) {
                newActiveTab = buildTabs[i - 1].tab;
              } else {
                newActiveTab = activeTab;
              }
            }
            this.setState({ buildTabs, activeTab: `${newActiveTab}` });
            break;
          }
        }

        break;
      default:
        break;
    }
  };
  render() {
    const { repoData } = this.state;
    return (
      <Row gutter={16}>
        <Col span={18}>{this.getTabs()}</Col>

        <Col span={6}>
          {repoData ? (
            <BuildsHistory repoData={repoData} onPostBuild={this.onPostBuild} />
          ) : null}
        </Col>
      </Row>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

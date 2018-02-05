import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Row, Col, Collapse, Input, List, Tabs } from 'antd';

import { API } from '../../../const';

import BranchBuildTab from './BranchBuildTab';
import BuildingInfo from './InfoTab';
import BuildsHistory from './BuildHisotry';
import './style.css';
import bfetch from '../../../bfetch';

const { Panel } = Collapse;
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
  async fetchRepo() {
    const { scm, owner, name } = this.props.params;
    try {
      const res = await bfetch(API.CICD.GET_REPO(scm, owner, name));
      this.setState({ repoData: res.results });
    } catch (e) {
      console.error(e);
    }
  }
  getLogProc() {
    return (
      <Panel header="Clone" key="1">
        <div
          style={{
            padding: '8px 16px',
            borderRadius: '5px',
            backgroundColor: '#eee',
          }}
        >
          <div>
            <span style={{ float: 'left', width: 30, color: '#bbb' }}>1</span>
            <span>
              + git clone https://github.com/cabernety/application.git
            </span>
            <span style={{ float: 'right' }}>8s</span>
          </div>
        </div>
      </Panel>
    );
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
          <BuildingInfo repoData={repoData} />
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
          {repoData ? <BuildsHistory repoData={repoData} /> : null}
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

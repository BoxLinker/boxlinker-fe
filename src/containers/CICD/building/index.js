import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Row, Col, Collapse, Input, List, Tabs } from 'antd';

import BranchBuildTab from './BranchBuildTab';
import BuildingInfo from './Info';
import './style.css';

const { Panel } = Collapse;
const { TabPane } = Tabs;

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
  state = {
    buildTabs: [],
    activeTab: 'lastBuild',
  };
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
  getBuildTabs() {
    const { buildTabs } = this.state;
    return buildTabs.map(item => {
      return (
        <TabPane tab={item.tab} key={item.tab} closable={true}>
          <BuildingInfo />
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
    const { activeTab } = this.state;
    return (
      <Row gutter={16}>
        <Col span={18}>
          <Tabs
            hideAdd
            activeKey={activeTab}
            onChange={this.onTabChange}
            onEdit={this.onTabEdit}
            type="editable-card"
          >
            <TabPane tab="最近构建" key="lastBuild" closable={false}>
              <BuildingInfo />
            </TabPane>
            <TabPane tab="分支构建" key="branch" closable={false}>
              <BranchBuildTab onOpenBuildTab={this.onOpenBuildTab} />
            </TabPane>
            {this.getBuildTabs()}
          </Tabs>
        </Col>

        <Col span={6}>
          <p>
            <Input placeholder="搜索" />
          </p>
          <List itemLayout="vertical">
            <List.Item extra={<Button shape="circle" icon="reload" />}>
              <List.Item.Meta
                title="cabernety/application"
                description={
                  <div>
                    <div>branch: master</div>
                    <div>3 天以前</div>
                    <div>2 分 15 秒</div>
                  </div>
                }
              />
            </List.Item>
            <List.Item extra={<Button shape="circle" icon="reload" />}>
              <List.Item.Meta
                title="cabernety/application"
                description={
                  <div>
                    <div>branch: master</div>
                    <div>3 天以前</div>
                    <div>2 分 15 秒</div>
                  </div>
                }
              />
            </List.Item>
            <List.Item extra={<Button shape="circle" icon="reload" />}>
              <List.Item.Meta
                title="cabernety/application"
                description={
                  <div>
                    <div>branch: master</div>
                    <div>3 天以前</div>
                    <div>2 分 15 秒</div>
                  </div>
                }
              />
            </List.Item>
          </List>
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

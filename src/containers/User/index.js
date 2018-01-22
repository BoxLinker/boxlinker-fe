import React from 'react';
import { connect } from 'react-redux';
import { Tabs } from 'antd';

const { TabPane } = Tabs;

class Comp extends React.Component {
  static displayName = 'User';
  onTabChange = index => {};
  render() {
    return (
      <Tabs defaultActiveKey="1" onTabClick={this.onTabChange}>
        <TabPane tab="基础信息" key="1">
          <a href="http://localhost:8083/v1/cicd/authorize/github">GitHub</a>
        </TabPane>
      </Tabs>
    );
  }
}

const Container = connect(null, dispatch => ({}))(Comp);

export default Container;

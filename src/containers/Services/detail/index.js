import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tabs } from 'antd';
import { API } from '../../../const';

const { TabPane } = Tabs;

class Comp extends React.Component {
  render() {
    return (
      <Tabs defaultActiveKey="1">
        <TabPane tab="Tab 1" key="1">
          Content of Tab Pane 1
        </TabPane>
        <TabPane tab="Tab 2" key="2">
          Content of Tab Pane 2
        </TabPane>
        <TabPane tab="Tab 3" key="3">
          Content of Tab Pane 3
        </TabPane>
      </Tabs>
    );
  }
}

const Container = connect(null, dispatch => ({
  list: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

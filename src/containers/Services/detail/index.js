import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tabs } from 'antd';
import BaseInfoPane from './BaseInfoPane';
import LogPane from './LogPane';
import MonitorPane from './MonitorPane';

const { TabPane } = Tabs;

class Comp extends React.Component {
  static displayName = 'ServiceDetail';
  toogleLog(flag) {
    if (this.logRef) {
      if (flag) {
        this.logRef.start();
      } else {
        this.logRef.stop();
      }
    }
  }
  onTabChange = index => {
    this.toogleLog(index === '3');
  };
  render() {
    const { name } = this.props.params;
    return (
      <Tabs defaultActiveKey="1" onTabClick={this.onTabChange}>
        <TabPane tab="基础信息" key="1">
          <BaseInfoPane svcName={name} />
        </TabPane>
        <TabPane tab="监控" key="2">
          <MonitorPane />
        </TabPane>
        <TabPane tab="日志" key="3" forceRender>
          <LogPane
            ref={ref => {
              this.logRef = ref;
            }}
          />
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

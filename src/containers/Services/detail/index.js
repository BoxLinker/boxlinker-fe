import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tabs } from 'antd';
import MemoryForm from './Memory';
import ImageForm from './Image';
import PortsForm from './Ports';
import LogPane from './LogPane';
import { API } from '../../../const';

const { TabPane } = Tabs;

class Comp extends React.Component {
  static displayName = 'ServiceDetail';
  onPortsSubmit = data => {
    console.log('onPortsSubmit', data);
  };
  onImageSubmit = data => {
    console.log('onImageSubmit', data);
  };
  onMemorySubmit = data => {
    console.log('onMemorySubmit', data);
  };
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
    return (
      <Tabs defaultActiveKey="1" onTabClick={this.onTabChange}>
        <TabPane tab="基础信息" key="1">
          <MemoryForm onSubmit={this.onMemorySubmit} />
          <ImageForm onSubmit={this.onImageSubmit} />
          <PortsForm onSubmit={this.onPortsSubmit} />
        </TabPane>
        <TabPane tab="监控" key="2">
          123
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

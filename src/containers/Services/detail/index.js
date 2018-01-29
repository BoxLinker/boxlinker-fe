import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Tabs } from 'antd';
import { breadCrumbAction } from '../../../actions';
import BaseInfoPane from './BaseInfoPane';
import LogPane from './LogPane';
import MonitorPane from './MonitorPane';

import { API } from '../../../const';
import bFetch from '../../../bfetch';

const { TabPane } = Tabs;

class Comp extends React.Component {
  static displayName = 'ServiceDetail';
  state = {
    baseinfo: null,
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
    if (index === '2') {
      if (this.monitorRef) {
        this.monitorRef.focus();
      } else {
        console.log('this.monitorRef null');
      }
    }
  };
  componentDidMount() {
    this.onLoad();
  }
  async onLoad() {
    const { name } = this.props.params;
    try {
      const res = await bFetch(API.SERVICE.GET(name));
      const ports = res.results.ports;
      if (ports) {
        res.results.ports = ports.map((port, key) => {
          return {
            ...port,
            key: `${key}`,
          };
        });
      }
      this.setState({
        baseinfo: res.results,
      });
      this.props.breadCrumb([
        {
          label: '控制台',
          path: '/',
        },
        {
          label: '服务列表',
          path: '/services',
        },
        {
          label: 'application',
        },
      ]);
    } catch (err) {
      console.error('dashboard services panel ', err);
    }
  }
  render() {
    const { baseinfo } = this.state;
    if (!baseinfo) {
      return <div>加载中...</div>;
    }
    const { name } = this.props.params;
    return (
      <Tabs defaultActiveKey="1" onTabClick={this.onTabChange}>
        <TabPane tab="基础信息" key="1">
          <BaseInfoPane svcDetail={baseinfo} />
        </TabPane>
        <TabPane tab="监控" key="2" forceRender>
          <MonitorPane
            svcName={name}
            svcDetail={baseinfo}
            ref={ref => {
              this.monitorRef = ref;
            }}
          />
        </TabPane>
        <TabPane tab="日志" key="3" forceRender>
          <LogPane
            svcName={name}
            svcDetail={baseinfo}
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
  breadCrumb: bc => {
    dispatch(breadCrumbAction(bc));
  },
}))(Comp);

export default Container;

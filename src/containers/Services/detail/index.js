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

const tabIndexes = ['baseinfo', 'monitor', 'log'];
const { TabPane } = Tabs;
const logger = console;

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
    const refE = this[`${index}Ref`];
    if (!refE) {
      logger.warn(`tab ref ${index} not found.`);
      return;
    }
    tabIndexes.forEach(item => {
      const refF = this[`${item}Ref`];
      if (index === item) {
        refF.focus();
      } else {
        refF.blur();
      }
    });
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
      <Tabs defaultActiveKey="baseinfo" onTabClick={this.onTabChange}>
        <TabPane tab="基础信息" key="baseinfo">
          <BaseInfoPane
            ref={ref => {
              this.baseinfoRef = ref;
            }}
            svcDetail={baseinfo}
          />
        </TabPane>
        <TabPane tab="监控" key="monitor" forceRender>
          <MonitorPane
            svcName={name}
            svcDetail={baseinfo}
            ref={ref => {
              this.monitorRef = ref;
            }}
          />
        </TabPane>
        <TabPane tab="日志" key="log" forceRender>
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

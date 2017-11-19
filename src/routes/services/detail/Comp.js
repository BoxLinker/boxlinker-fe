import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'boxlinker-ui'; // eslint-disable-line
import LogView from 'components/Log';
// import InputViewer from 'components/InputViewer';
import { PanelTabs } from 'components/Tabs';
import s from './index.css'; // eslint-disable-line
import { BaseInfoTab, MonitorTab } from './tabs';
/* eslint-disable no-script-url,class-methods-use-this */

// const logger = console;

class Comp extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    loadServiceDetail: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {
    this.props.loadServiceDetail(this.props.name);
  }
  onSwitchTab = key => {
    ['baseinfo', 'log', 'monitor', 'settings'].forEach(index => {
      const ref = this[`${index}Ref`];
      if (key === index) {
        ref.focus && ref.focus(); // eslint-disable-line
      } else {
        ref.blur && ref.blur(); // eslint-disable-line
      }
    });

    if (key !== 'log') {
      this.logRef.stop();
    } else {
      this.logRef.start();
    }
  };
  getTabBaseinfo() {
    return (
      <BaseInfoTab
        ref={ref => {
          this.baseinfoRef = ref;
        }}
      />
    );
  }
  getTabLog() {
    return (
      <LogView
        ref={ref => {
          this.logRef = ref;
        }}
      />
    );
  }
  getTabSettings() {
    return (
      <div
        ref={ref => {
          this.settingsRef = ref;
        }}
      >
        设置
      </div>
    );
  }
  getTabMonitor() {
    return (
      <MonitorTab
        ref={ref => {
          this.monitorRef = ref;
        }}
      />
    );
  }
  render() {
    const { name } = this.props;
    return (
      <PanelTabs
        title={name}
        activeKey="baseinfo"
        onSwitchTab={this.onSwitchTab}
        tabs={[
          {
            key: 'baseinfo',
            label: '基础信息',
            tabView: this.getTabBaseinfo(),
          },
          {
            key: 'monitor',
            label: '监控',
            tabView: this.getTabMonitor(),
          },
          {
            key: 'log',
            label: '日志',
            tabView: this.getTabLog(),
          },
          {
            key: 'settings',
            label: '设置',
            tabView: this.getTabSettings(),
          },
        ]}
      />
    );
  }
}

export default withStyles(s)(Comp);

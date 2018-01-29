import React from 'react';
import PropTypes from 'prop-types';
import { List, Button } from 'antd';

const recent5BuildingData = [
  {
    status: 'success',
    buildNum: 1,
  },
  {
    status: 'success',
    buildNum: 2,
  },
  {
    status: 'failed',
    buildNum: 3,
  },
  {
    status: 'success',
    buildNum: 4,
  },
  {
    status: 'success',
    buildNum: 5,
  },
];

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
  static propTypes = {
    onOpenBuildTab: PropTypes.func,
  };
  static defaultProps = {
    onOpenBuildTab: () => {},
  };
  openBuildTab = item => {
    this.props.onOpenBuildTab(item);
  };
  getBuildHistory(branch) {
    const lis = recent5BuildingData.map((item, i) => {
      item.branch = branch;
      item.tab = `${item.branch}#${item.buildNum}`;
      return (
        <li className={`build-item ${item.status}`} key={item.buildNum}>
          <a
            onClick={() => {
              this.openBuildTab(item);
            }}
          >{`#${i + 1}`}</a>
        </li>
      );
    });
    return <ul className="build-history5">{lis.reverse()}</ul>;
  }
  render() {
    return (
      <List bordered itemLayout="vertical" style={{ padding: '8px 0' }}>
        <List.Item extra={this.getBuildHistory('master')}>
          <List.Item.Meta title="master" />
          <Button type="primary">开始构建</Button>
        </List.Item>
        <List.Item extra={this.getBuildHistory('v0.1-dev-1-8d0djduyd')}>
          <List.Item.Meta title="v0.1-dev-1-8d0djduyd" />
          <Button type="primary">开始构建</Button>
        </List.Item>
      </List>
    );
  }
}

export default Comp;

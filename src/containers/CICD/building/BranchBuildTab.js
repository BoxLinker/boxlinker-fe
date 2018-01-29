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

class BuildHistory5 extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
  };
  render() {
    const { branch, data } = this.props.data;
    return (
      <List.Item extra={this.getBuildHistory(data)}>
        <List.Item.Meta title={branch} />
        <Button type="primary">开始构建</Button>
      </List.Item>
    );
  }
  openBuildTab = item => {
    console.log('item', item, this.props.data);
    this.props.onOpenBuildTab(item);
  };
  getBuildHistory(data) {
    const lis = data.map((item, i) => {
      const { branch } = this.props.data;
      const dData = {
        ...item,
        branch,
        tab: `${branch}#${item.buildNum}`,
      };
      return (
        <li className={`build-item ${dData.status}`} key={dData.buildNum}>
          <a
            onClick={() => {
              this.openBuildTab(dData);
            }}
          >{`#${i + 1}`}</a>
        </li>
      );
    });
    return <ul className="build-history5">{lis.reverse()}</ul>;
  }
}

const branchList = [
  { branch: 'master', data: recent5BuildingData },
  { branch: 'v0.1-dev-1-8d0djduyd', data: recent5BuildingData },
];

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
  static propTypes = {
    onOpenBuildTab: PropTypes.func,
  };
  static defaultProps = {
    onOpenBuildTab: () => {},
  };
  getBuildHistory(branch) {}
  render() {
    return (
      <List
        bordered
        itemLayout="vertical"
        style={{ padding: '8px 0' }}
        dataSource={branchList}
        renderItem={item => (
          <BuildHistory5
            onOpenBuildTab={this.props.onOpenBuildTab}
            data={item}
          />
        )}
      >
        {/* 
        <List.Item extra={this.getBuildHistory('master')}>
          <List.Item.Meta title="master" />
          <Button type="primary">开始构建</Button>
        </List.Item>
        <List.Item extra={this.getBuildHistory('v0.1-dev-1-8d0djduyd')}>
          <List.Item.Meta title="v0.1-dev-1-8d0djduyd" />
          <Button type="primary">开始构建</Button>
        </List.Item> */}
      </List>
    );
  }
}

export default Comp;

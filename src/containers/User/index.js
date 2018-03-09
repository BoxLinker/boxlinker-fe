import React from 'react';
import { connect } from 'react-redux';
import { Tabs, Icon, List, Tag } from 'antd';
import { API } from '../../const';
import Title from '../../components/Title';
import Button from '../../components/Button';
import './style.css';
import bFetch from '../../bfetch';

const { TabPane } = Tabs;

const ALL_SCMS = ['github'];

class Comp extends React.Component {
  static displayName = 'User';
  state = {
    scms: [],
  };
  onTabChange = index => {};
  bindVCS = () => {
    window.location.href = API.CICD.BIND_VCS('github');
  };
  unBindVCS = () => {};
  componentDidMount() {
    this.fetchUserScms();
  }
  async fetchUserScms() {
    const res = await bFetch(API.CICD.GET_VCS, {
      method: 'get',
    });
    this.setState({
      scms: res.results,
    });
  }
  getTitleTag(exist) {
    if (exist) {
      return <Tag color="green">已绑定</Tag>;
    }
    return <Tag>未绑定</Tag>;
  }
  render() {
    const { userinfo = {} } = this.props;
    const { scms = [] } = this.state;
    const scmsList = ALL_SCMS.map(scmName => {
      const scm = scms.find(item => {
        return item.scm === scmName;
      });
      const btn = scm ? (
        '已绑定'
      ) : (
        <Button onClick={this.bindVCS}>点击绑定</Button>
      );
      return (
        <List.Item key={scmName} actions={[btn]}>
          <List.Item.Meta
            avatar={<Icon type={scmName} style={{ fontSize: '32px' }} />}
            title={
              <div>
                {scmName}&nbsp;
                {this.getTitleTag(!!scm)}
              </div>
            }
            description={`可以为您 ${scmName} 上的项目提供自动构建、服务创建、滚动更新等服务。`}
          />
        </List.Item>
      );
    });
    return (
      <Tabs defaultActiveKey="1" onTabClick={this.onTabChange}>
        <TabPane tab="基础信息" key="1">
          <Title size={4}>账户</Title>
          <p>{userinfo.name}</p>
        </TabPane>
        <TabPane tab="第三方账号绑定" key="2">
          <Title size={4}>已绑定账号</Title>
          <List itemLayout="horizontal" bordered>
            {scmsList}
          </List>
        </TabPane>
      </Tabs>
    );
  }
}

const Container = connect(
  (state, ownProps) => {
    return {
      userinfo: state.userinfo,
    };
  },
  dispatch => ({}),
)(Comp);

export default Container;

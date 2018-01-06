import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import './App.css';

const { Header, Sider, Content } = Layout;

class Comp extends React.Component {
  state = {
    collapsed: false,
  };

  onClickItem = ({ key }) => {
    this.props.navigateTo(key);
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    const { collapsed } = this.state;
    return (
      <Layout>
        <Sider
          style={{
            overflow: 'auto',
            height: '100vh',
            position: 'fixed',
            left: 0,
          }}
          trigger={null}
          collapsible
          collapsed={this.state.collapsed}
        >
          <div className="App-logo" />
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={[window.location.pathname]}
            onSelect={this.onClickItem}
          >
            <Menu.Item key="/">
              <Icon type="user" />
              <span>控制台</span>
            </Menu.Item>
            <Menu.Item key="/services">
              <Icon type="video-camera" />
              <span>服务</span>
            </Menu.Item>
            <Menu.Item key="/volumes">
              <Icon type="upload" />
              <span>数据卷</span>
            </Menu.Item>
            <Menu.Item key="/images">
              <Icon type="upload" />
              <span>镜像</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout
          className="App-layout"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Header
            className="App-header"
            style={{ background: '#fff', padding: 0 }}
          >
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
              minHeight: 1280,
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

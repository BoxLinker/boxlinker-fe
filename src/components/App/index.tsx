import * as React from 'react';
import { Layout, Menu, Icon } from 'antd';
import { Link } from 'react-router';
import './App.css';

const { Header, Sider, Content } = Layout;

// export interface Props {
//   children: 
// };

class App extends React.Component {
  state = {
    collapsed: false,
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  }
  render() {
    const { collapsed } = this.state;
    return (
      <Layout>
        <Sider
          style={{ overflow: 'auto', height: '100vh', position: 'fixed', left: 0 }}
          trigger={null}
          collapsible={true}
          collapsed={this.state.collapsed}
        >
          <div className="App-logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <Link to="/">
                <Icon type="user" />
                <span>控制台</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="2">
              <Link to="/services">
                <Icon type="video-camera" />
                <span>服务</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="3">
              <Icon type="upload" />
              <span>数据卷</span>
            </Menu.Item>
            <Menu.Item key="4">
              <Icon type="upload" />
              <span>镜像</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: collapsed ? 80 : 200 }}>
          <Header className="App-header" style={{ background: '#fff', padding: 0 }}>
            <Icon
              className="trigger"
              type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
              onClick={this.toggle}
            />
          </Header>
          <Content style={{ margin: '24px 16px', padding: 24, background: '#fff', minHeight: 1280 }}>
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default App;
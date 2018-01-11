// eslint-disable no-script-url, jsx-a11y/anchor-is-valid
import * as React from 'react';
import { Layout, Menu, Icon, Dropdown } from 'antd';
import { connect } from 'react-redux';
import cookie from 'js-cookie';
import { push } from 'react-router-redux';
import { getUserInfoAction } from '../../actions/auth';
import './App.css';

const { Header, Sider, Content } = Layout;
const logger = console;
class Comp extends React.Component {
  static displayName = 'Layout';
  state = {
    collapsed: true,
  };
  componentDidMount() {
    this.props.getUserInfo();
  }
  onClickItem = ({ key }) => {
    this.props.navigateTo(key);
  };
  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };
  handleHeaderMenuSelect = ({ key }) => {
    console.log('key', key);
    switch (key) {
      case 'logout':
        this.props.logout();
        this.props.navigateTo('/login');
        break;
      default:
        break;
    }
  };

  render() {
    const { collapsed } = this.state;
    const { userinfo = {} } = this.props;
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
          <div className="App-logo">{collapsed ? 'B' : 'Boxlinker'}</div>
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
        <Header className="App-header" style={{ left: collapsed ? 80 : 200 }}>
          <Icon
            className="trigger"
            type={this.state.collapsed ? 'menu-unfold' : 'menu-fold'}
            onClick={this.toggle}
          />
          <ul className="header-menu">
            <li>
              <Dropdown
                placement="bottomLeft"
                overlay={
                  <Menu onClick={this.handleHeaderMenuSelect}>
                    <Menu.Item key="logout">退出</Menu.Item>
                  </Menu>
                }
              >
                <a href="javascript:void(0)" className="ant-dropdown-link">
                  {userinfo.name}
                </a>
              </Dropdown>
            </li>
          </ul>
        </Header>
        <Layout
          className="App-layout"
          style={{ marginLeft: collapsed ? 80 : 200 }}
        >
          <Content
            style={{
              margin: '24px 16px',
              padding: 24,
              background: '#fff',
            }}
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}

const Container = connect(
  state => {
    return {
      userinfo: state.userinfo,
    };
  },
  dispatch => ({
    navigateTo: path => {
      dispatch(push(path));
    },
    logout: () => {
      cookie.remove('X-Access-Token');
      dispatch(push('/login'));
    },
    getUserInfo: () => {
      dispatch(getUserInfoAction());
    },
  }),
)(Comp);

export default Container;

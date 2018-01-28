// eslint-disable no-script-url, jsx-a11y/anchor-is-valid
import * as React from 'react';
import PropTypes from 'prop-types';
import { Layout, Menu, Icon, Dropdown, Breadcrumb } from 'antd';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import cookie from 'js-cookie';
import { push } from 'react-router-redux';
import { getUserInfoAction } from '../../actions/auth';
import './App.css';

const RbacTree = [
  {
    name: '控制台',
    path: '/',
    children: [],
  },
  {
    name: '服务',
    path: '/services',
    children: [
      {
        name: '服务详情',
        path: '/services/{svcName}',
      },
    ],
  },
];

const { Header, Sider, Content } = Layout;
const logger = console;
class Comp extends React.Component {
  static displayName = 'Layout';
  state = {
    collapsed: false,
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
    switch (key) {
      case 'logout':
        this.props.logout();
        this.props.navigateTo('/login');
        break;
      default:
        break;
    }
  };
  getBreadcrumb() {
    const re = [];
    let path = this.props.location.pathname;
    if (!/^\//.test(path)) {
      path = `/${path}`;
    }
    if (path === '/') {
      re.push({ label: '控制台' });
    } else {
      re.push({ label: '控制台', path: '/' });
    }
    path = path.substring(1);
    const segs = path.split('/');
    switch (segs[0]) {
      case 'services':
        if (segs[1]) {
          re.push({ label: '服务列表', path: '/services' });
          re.push({ label: segs[1] });
        } else {
          re.push({ label: '服务列表' });
        }
        break;
      case 'volumes':
        if (segs[1]) {
          re.push({ label: '数据卷列表', path: '/volumes' });
          re.push({ label: segs[1] });
        } else {
          re.push({ label: '数据卷列表' });
        }
        break;
      case 'images':
        if (segs[1]) {
          re.push({ label: '镜像列表', path: '/images' });
          re.push({ label: segs[1] });
        } else {
          re.push({ label: '镜像列表' });
        }
        break;
      case 'cicd':
        if (segs[2]) {
          re.push({ label: 'cicd', path: '/cicd' });
          re.push({ label: segs[2] });
        } else {
          re.push({ label: 'cicd' });
        }
        break;
      default:
        break;
    }
    return this.getBreadcrumbUI(re);
  }
  getBreadcrumbUI(arr) {
    const items = arr.map((item, i) => {
      if (item.path) {
        return (
          <Breadcrumb.Item key={i}>
            <Link to={item.path}>{item.label}</Link>
          </Breadcrumb.Item>
        );
      }
      return <Breadcrumb.Item key={i}>{item.label}</Breadcrumb.Item>;
    });
    return <Breadcrumb style={{ margin: '24px 16px 0' }}>{items}</Breadcrumb>;
  }

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
            <Menu.Item key="/cicd">
              <Icon type="upload" />
              <span>CICD</span>
            </Menu.Item>
            <Menu.Item key="/user">
              <Icon type="upload" />
              <span>用户</span>
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
          {this.getBreadcrumb()}
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
  (state, ownProps) => {
    return {
      breadCrumb: state.breadCrumb,
      userinfo: state.userinfo,
      location: ownProps.location,
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

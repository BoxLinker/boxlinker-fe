import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { push } from 'react-router-redux';
import { Collapse, List, Avatar, Spin, Tag } from 'antd';
import bFetch from '../../../bfetch';
import { API } from '../../../const';

const { Panel } = Collapse;

class Comp extends React.Component {
  state = {
    data: null,
  };
  componentDidMount() {
    this.fetch();
  }
  getList() {
    const { data } = this.state;
    if (!data) {
      return (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Spin />
        </div>
      );
    } else if (!data.length) {
      return (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>暂无数据</div>
      );
    }
    return (
      <List
        itemLayout="horizontal"
        size="small"
        dataSource={data}
        renderItem={item => (
          <List.Item>
            <List.Item.Meta
              title={
                <span>
                  <Tag color="green">运行中</Tag>
                  <Link to={`/services/${item.name}`}>{item.name}</Link>
                </span>
              }
              description=""
            />
          </List.Item>
        )}
      />
    );
  }
  fetch = async () => {
    try {
      const res = await bFetch(API.SERVICE.QUERY);
      const { data } = res.results;
      this.setState({ data });
    } catch (err) {
      console.error('dashboard services panel ', err);
    }
  };
  render() {
    return (
      <Collapse className="dashboard-panel" defaultActiveKey={['1']}>
        <Panel header="服务列表" key="1">
          {this.getList()}
        </Panel>
      </Collapse>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

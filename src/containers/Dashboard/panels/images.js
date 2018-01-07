import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Collapse, List, Spin, Tag } from 'antd';
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
    if (!data || !data.length) {
      return (
        <div style={{ textAlign: 'center', padding: '20px 0' }}>
          <Spin />
        </div>
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
                  <a href="https://ant.design">{`${item.name}:${item.tag}`}</a>
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
      const res = await bFetch(API.IMAGES.QUERY);
      const { data } = res.results;
      this.setState({ data });
    } catch (err) {
      console.error('dashboard services panel ', err);
    }
  };
  render() {
    return (
      <Collapse className="dashboard-panel" defaultActiveKey={['1']}>
        <Panel header="镜像列表" key="1">
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

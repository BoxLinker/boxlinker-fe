import React from 'react';
import { Button, Row, Col, Collapse, Input, List, Tabs } from 'antd';

import { API } from '../../../const';
import { getDuration } from '../../../utils';
import bfetch from '../../../bfetch';

class Comp extends React.Component {
  static displayName = 'CICDBuildingHistory';
  state = {
    buildsData: null,
    pagination: {
      currentPage: 1,
      pageCount: 10,
    },
  };
  componentDidMount() {
    this.fetch();
  }
  async fetch() {
    const { repoData } = this.props;
    const { scm, name, owner } = repoData;
    try {
      const res = await bfetch(API.CICD.QUERY_BUILDS(scm, owner, name), {
        params: {
          ...this.state.pagination,
        },
      });
      this.setState({
        buildsData: res.results.data,
        pagination: res.results.pagination,
      });
    } catch (e) {
      console.log('query buidls err: ', e);
    }
  }
  getList() {
    const { buildsData } = this.state;
    const { owner, name } = this.props.repoData;
    if (!buildsData) {
      return <p>加载中...</p>;
    }
    return (
      <List
        itemLayout="vertical"
        dataSource={buildsData}
        renderItem={item => {
          const {
            branch,
            created_at,
            started_at,
            finished_at,
            status,
            event,
            sender,
          } = item;
          return (
            <List.Item extra={<Button shape="circle" icon="reload" />}>
              <List.Item.Meta
                title={`${owner}/${name}`}
                description={
                  <div>
                    <div>branch: {branch}</div>
                    <div>{created_at}</div>
                    <div>{getDuration(started_at, finished_at)}</div>
                    <div>status: {status}</div>
                    <div>event: {event}</div>
                    <div>sender: {sender}</div>
                  </div>
                }
              />
            </List.Item>
          );
        }}
      />
    );
  }
  render() {
    const list = this.getList();
    return (
      <div>
        <p>
          <Input placeholder="搜索" />
        </p>
        {list}
      </div>
    );
  }
}

export default Comp;

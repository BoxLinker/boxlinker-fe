import React from 'react';
import { Tag } from 'antd';
import bFetch from '../../../bfetch';
import { API, BuildColorMap } from '../../../const';

export default class extends React.Component {
  state = {
    loading: true,
    data: null,
  };
  componentDidMount() {
    this.fetch();
  }
  async fetch() {
    const { data } = this.props;
    if (!data) {
      return;
    }
    try {
      const res = await bFetch(
        API.CICD.GET_BUILD(data.scm, data.owner, data.name, data.last_build),
      );
      this.setState({ data: res.results, loading: false });
    } catch (e) {
      console.error(e);
    }
  }
  getBuildDuration(data) {
    console.log('data', data);
    const sec = data.finished_at - data.started_at;
    return `${Math.floor(sec / 60)} 分 ${sec % 60} 秒`;
  }
  render() {
    const { data, loading } = this.state;
    if (loading) {
      return <span>加载中...</span>;
    }
    if (!data) {
      return <span>暂无构建历史</span>;
    }
    return (
      <span>
        <Tag color={BuildColorMap[data.status]}>{data.status}</Tag> 用时{' '}
        {this.getBuildDuration(data)}。
      </span>
    );
  }
}

import React from 'react';
import { Tag } from 'antd';
import bFetch from '../../../bfetch';
import { API } from '../../../const';

const colorMap = {
  success: 'green',
  failure: 'red',
};

export default class extends React.Component {
  state = {
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
      this.setState({ data: res.results });
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
    const { data } = this.state;
    if (!data) {
      return <span>加载中...</span>;
    }
    return (
      <span>
        <Tag color={colorMap[data.status]}>{data.status}</Tag> 用时{' '}
        {this.getBuildDuration(data)}。
      </span>
    );
  }
}

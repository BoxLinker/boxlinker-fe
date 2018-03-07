import React from 'react';
import PropTypes from 'prop-types';
import { Button, Tag, Input, List } from 'antd';

import { API, BuildColorMap } from '../../../const';
import { getBuildDuration, fromNow } from '../../../utils';
import bfetch from '../../../bfetch';

class HistoryItem extends React.Component {
  static propTypes = {
    onPostBuild: PropTypes.func,
    onClickItem: PropTypes.func,
  };
  static defaultProps = {
    onPostBuild: () => {},
    onClickItem: () => {},
  };
  state = {
    loading: false,
  };
  postBuild = async () => {
    this.setState({ loading: true });
    const { buildData, repoData } = this.props;
    const { owner, scm, name } = repoData;
    const { number } = buildData;
    try {
      await bfetch(API.CICD.POST_BUILD(scm, owner, name, number), {
        method: 'POST',
      });
      this.props.onPostBuild();
    } catch (e) {
      console.log('postbuild err: ', e);
    }
    this.setState({ loading: false });
  };
  openTab = () => {
    const { buildData } = this.props;
    this.props.onClickItem(buildData);
  };
  render() {
    const { loading } = this.state;
    const { buildData, repoData } = this.props;
    const { owner, name } = repoData;
    const { branch, created_at, status, event, sender } = buildData;
    return (
      <List.Item
        extra={
          <Button
            loading={loading}
            onClick={() => {
              this.postBuild();
            }}
            shape="circle"
            icon="reload"
          />
        }
      >
        <List.Item.Meta
          title={<a onClick={this.openTab}>{`${owner}/${name}`}</a>}
          description={
            <div>
              <div>分支: {branch}</div>
              <div>创建于: {fromNow(created_at)}</div>
              <div>构建用时: {getBuildDuration(buildData)}</div>
              <div>
                状态: <Tag color={BuildColorMap[status]}>{status}</Tag>
              </div>
              <div>事件: {event}</div>
              <div>构建人: {sender}</div>
            </div>
          }
        />
      </List.Item>
    );
  }
}

const enableReFetch = false;
class Comp extends React.Component {
  static displayName = 'CICDBuildingHistory';
  static propTypes = {
    onClickItem: PropTypes.func,
  };
  static defaultProps = {
    onClickItem: () => {},
  };
  state = {
    buildsData: null,
    pagination: {
      currentPage: 1,
      pageCount: 5,
    },
  };
  componentDidMount() {
    this.fetch();
  }
  componentWillUnmount() {
    if (this.sid) {
      clearTimeout(this.sid);
    }
  }
  refetch() {
    if (enableReFetch) {
      this.sid = setTimeout(() => {
        this.fetch();
      }, 5000);
    }
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
      this.setState(
        {
          buildsData: res.results.data,
          pagination: res.results.pagination,
        },
        () => {
          this.refetch();
        },
      );
    } catch (e) {
      console.log('query buidls err: ', e);
      this.refetch();
    }
  }
  getList() {
    const { buildsData } = this.state;
    const { repoData } = this.props;
    if (!buildsData) {
      return <p>加载中...</p>;
    }
    return (
      <List
        itemLayout="vertical"
        dataSource={buildsData}
        renderItem={item => {
          return (
            <HistoryItem
              onClickItem={this.props.onClickItem}
              buildData={item}
              repoData={repoData}
            />
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

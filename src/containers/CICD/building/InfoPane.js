import React from 'react';
import { Row, Col, Tag } from 'antd';
import { getDuration, fromNow } from '../../../utils';
import { API, BuildColorMap } from '../../../const';
import bfetch from '../../../bfetch';

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
  state = {
    buildData: null,
    repoData: null,
  };
  // componentDidMount() {
  //   this.fetch();
  // }
  async fetch() {
    const { repoData, buildData } = this.props;
    if (!repoData) {
      return;
    }
    const { scm, owner, name, last_build } = repoData;
    try {
      const res = await bfetch(
        API.CICD.GET_BUILD(
          scm,
          owner,
          name,
          buildData ? buildData.number : last_build,
        ),
      );
      this.setState({ buildData: res.results });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const { buildData } = this.props;
    if (!buildData) {
      return <p>加载中...</p>;
    }
    return (
      <Row
        style={{
          padding: 16,
        }}
        gutter={16}
      >
        <Col span={18}>
          <p>分支: {buildData.branch}</p>
          <p>Commit: {buildData.commit}</p>
          <p>提交信息: {buildData.message}</p>
        </Col>
        <Col span={6}>
          <p>创建于: {fromNow(buildData.created_at)}</p>
          <p>
            构建用时: {getDuration(buildData.started_at, buildData.finished_at)}
          </p>
          <div>
            状态:{' '}
            <Tag color={BuildColorMap[buildData.status]}>
              {buildData.status}
            </Tag>
          </div>
        </Col>
      </Row>
    );
  }
}

export default Comp;

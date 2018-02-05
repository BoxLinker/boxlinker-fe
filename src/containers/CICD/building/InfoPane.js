import React from 'react';
import { Row, Col } from 'antd';
import { getDuration } from '../../../utils';
import { API } from '../../../const';
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
          background: 'orange',
          marginBottom: 16,
          padding: 16,
          color: '#fff',
        }}
      >
        <Col span={18}>
          <p>Branch: {buildData.branch}</p>
          <p>Commit: {buildData.commit}</p>
          <p>{buildData.message}</p>
        </Col>
        <Col span={6}>
          <p>{buildData.created_at}</p>
          <p>{getDuration(buildData.started_at, buildData.finished_at)}</p>
        </Col>
      </Row>
    );
  }
}

export default Comp;

import React from 'react';
import { Row, Col, Collapse } from 'antd';
import { getDuration } from '../../../utils';
import { API } from '../../../const';
import bfetch from '../../../bfetch';

const { Panel } = Collapse;

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
  state = {
    buildData: null,
    procsData: null,
  };
  getLogProc() {
    return (
      <Panel header="Clone" key="1">
        <div
          style={{
            padding: '8px 16px',
            borderRadius: '5px',
            backgroundColor: '#eee',
          }}
        >
          <div>
            <span style={{ float: 'left', width: 30, color: '#bbb' }}>1</span>
            <span>
              + git clone https://github.com/cabernety/application.git
            </span>
            <span style={{ float: 'right' }}>8s</span>
          </div>
        </div>
      </Panel>
    );
  }
  componentDidMount() {
    this.fetch();
  }
  async fetchLog() {
    const { buildData } = this.state;
    const { data } = this.props;
    try {
      const res = await bfetch(
        API.CICD.PROCS(data.scm, data.owner, data.name, buildData.id),
      );
      this.setState({ procsData: res.results });
    } catch (e) {
      console.error(e);
    }
  }
  async fetch() {
    const { data } = this.props;
    if (!data) {
      return;
    }
    try {
      const res = await bfetch(
        API.CICD.GET_BUILD(data.scm, data.owner, data.name, data.last_build),
      );
      this.setState({ buildData: res.results }, () => {
        this.fetchLog();
      });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const { buildData } = this.state;
    if (!buildData) {
      return <p>加载中...</p>;
    }
    return (
      <div>
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
        <Row>
          <Col>
            <Collapse defaultActiveKey={['1']} bordered={false}>
              {this.getLogProc()}
            </Collapse>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Comp;

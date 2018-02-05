import React from 'react';
import { Row, Col, Collapse } from 'antd';
import { getDuration } from '../../../utils';
import { API } from '../../../const';
import bfetch from '../../../bfetch';
import './info.css';

const { Panel } = Collapse;

class ProcLog extends React.Component {
  state = {
    logData: null,
  };
  componentDidMount() {
    this.fetch();
  }
  async fetch() {
    const { metadata, procData } = this.props;
    const { scm, owner, name, last_build } = metadata;
    const { pid } = procData;
    try {
      const res = await bfetch(
        API.CICD.PROC_LOG(scm, owner, name, last_build, pid),
        {
          disableDefaultHandler: true,
        },
      );
      this.setState({ logData: res });
    } catch (e) {
      console.error(e);
    }
  }
  getLogComp(data) {
    const { pos, time = 0, out } = data;
    return (
      <div key={pos} className="log-line">
        <span className="log-index" data-log-index={pos + 1} />
        <span
          className="log-content"
          dangerouslySetInnerHTML={{ __html: out }}
        />
        <span className="log-ts" data-log-time={`${time}s`} />
      </div>
    );
  }
  getLogData() {
    const { logData } = this.state;
    if (!logData) {
      return <div>加载中...</div>;
    }
    return logData.map(log => this.getLogComp(log));
  }
  render() {
    return (
      <div
        style={{
          padding: '8px 16px',
          borderRadius: '5px',
          backgroundColor: '#eee',
        }}
      >
        {this.getLogData()}
      </div>
    );
  }
}

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
  state = {
    buildData: null,
    procsData: null,
  };
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
  getLogProc() {
    const { procsData } = this.state;
    const { data } = this.props;
    if (!procsData || procsData.length <= 1) {
      return (
        <Panel>
          <p>日志加载中...</p>
        </Panel>
      );
    }
    return (
      <Collapse defaultActiveKey={procsData[1].name} bordered={false}>
        {procsData.map((proc, i) => {
          // 第一条 proc 不作为日志记录，而是全局日志状态记录
          if (i === 0) {
            return null;
          }
          return (
            <Panel header={proc.name} key={proc.name}>
              <ProcLog key={proc.id} procData={proc} metadata={data} />
            </Panel>
          );
        })}
      </Collapse>
    );
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
          <Col>{this.getLogProc()}</Col>
        </Row>
      </div>
    );
  }
}

export default Comp;

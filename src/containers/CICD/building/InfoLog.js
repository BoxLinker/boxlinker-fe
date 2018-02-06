import React from 'react';
import { Row, Col, Collapse } from 'antd';
import { API } from '../../../const';
import bfetch from '../../../bfetch';

const { Panel } = Collapse;

class ProcLog extends React.Component {
  state = {
    logData: null,
  };
  componentDidMount() {
    // if (this.props.repoData.status === 'running') {
    //   this.fetchStream();
    //   return;
    // }
    this.fetch();
  }
  // async fetchStream() {
  //   const { repoData, procData } = this.props;
  //   const { scm, owner, name, last_build } = repoData;
  //   const { pid } = procData;
  //   try {
  //     await bfetch(API.CICD.PROC_STREAM_LOG(scm, owner, name, last_build))
  //   }
  // }
  async fetch() {
    const { repoData, procData } = this.props;
    const { scm, owner, name, last_build } = repoData;
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
  static displayName = 'CICDBuildingInfoLog';
  state = {
    procsData: null,
  };
  componentDidMount() {
    this.fetchLog();
  }
  async fetchLog() {
    const { repoData, buildData } = this.props;
    const { scm, owner, name } = repoData;
    try {
      const res = await bfetch(API.CICD.PROCS(scm, owner, name, buildData.id));
      this.setState({ procsData: res.results });
    } catch (e) {
      console.error(e);
    }
  }
  getLogProc() {
    const { procsData } = this.state;
    const { repoData } = this.props;
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
              <ProcLog key={proc.id} procData={proc} repoData={repoData} />
            </Panel>
          );
        })}
      </Collapse>
    );
  }
  render() {
    const { procsData } = this.state;
    if (!procsData) {
      return <p>加载中...</p>;
    }
    return (
      <Row>
        <Col>{this.getLogProc()}</Col>
      </Row>
    );
  }
}

export default Comp;

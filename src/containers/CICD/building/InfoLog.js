import React from 'react';
import { Row, Col, Collapse, Spin, Icon } from 'antd';
import fetchStream from 'fetch-stream';
import cookies from 'js-cookie';
import { API } from '../../../const';
import bfetch from '../../../bfetch';

const { Panel } = Collapse;

class ProcLog extends React.Component {
  static displayName = 'ProcLog';
  state = {
    logData: null,
  };
  componentDidMount() {
    this.fetch();
  }
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
    const out1 = out.split('\r');
    return (
      <div key={pos} className="log-line">
        <span className="log-index" data-log-index={pos + 1} />
        <span
          className="log-content"
          dangerouslySetInnerHTML={{ __html: out1[out1.length - 1] }}
        />
        <span className="log-ts" data-log-time={`${time}s`} />
      </div>
    );
  }
  getLogData() {
    const { logData } = this.state;
    if (!logData || !logData.length) {
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

class RunningProcLog extends React.Component {
  static displayName = 'RunningProcLog';
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
    const { logData } = this.props;
    if (!logData || !logData.length) {
      return <div>加载中...</div>;
    }
    return logData.map(log => this.getLogComp(log));
  }
  render() {
    const { procData } = this.props;
    const { state } = procData;
    return (
      <div
        style={{
          padding: '8px 16px',
          borderRadius: '5px',
          backgroundColor: '#eee',
        }}
      >
        {this.getLogData()}

        {state === 'pending' ? (
          <div className="log-line">
            <span className="log-index" />
            <span className="log-content">
              <Spin
                indicator={
                  <Icon type="loading" style={{ fontSize: 24 }} spin />
                }
              />
            </span>
          </div>
        ) : null}
      </div>
    );
  }
}

class Comp extends React.Component {
  static displayName = 'CICDBuildingInfoLog';
  state = {
    procsData: null,
    logDatas: {},
  };
  componentDidMount() {
    this.fetchProcs();
  }
  async fetchProcs() {
    const { repoData, buildData } = this.props;
    const { scm, owner, name } = repoData;
    try {
      const res = await bfetch(API.CICD.PROCS(scm, owner, name, buildData.id));
      this.setState({ procsData: res.results });
      if (buildData.status === 'running') {
        this.fetchStream();
      }
    } catch (e) {
      console.error(e);
    }
  }
  parseLogLine(str) {
    const { logDatas } = this.state;
    try {
      const logData = JSON.parse(str);
      const dLog = JSON.parse(logData.data);
      if (!logDatas[dLog.proc]) {
        logDatas[dLog.proc] = [];
      }
      logDatas[dLog.proc].push(dLog);
      this.setState({
        logDatas,
      });
    } catch (e) {
      console.error('parseLogLine err: ', e);
    }
  }
  async fetchStream() {
    const { repoData } = this.props;
    const { scm, owner, name, last_build } = repoData;

    const handler = result => {
      if (!result) {
        return false;
      }
      if (result.done) {
        console.log('completed');
        return;
      }
      const str = String(result.value);
      switch (str) {
        case 'eof':
          return false;
        case 'ping':
          return true;
        default:
          this.parseLogLine(str);
      }
      return true; // return false to cancel
    };

    fetchStream(
      {
        url: API.CICD.PROC_STREAM_LOG(scm, owner, name, last_build),
        headers: {
          'X-Access-Token': cookies.get('X-Access-Token'),
        },
      },
      handler,
    );
  }
  render() {
    const { procsData, logDatas } = this.state;
    const { repoData, buildData } = this.props;
    const isRunning = buildData.status === 'running';
    if (!procsData) {
      return <p>加载中...</p>;
    }
    if (!procsData.length) {
      return <p>暂无数据</p>;
    }
    procsData.sort((a, b) => {
      if (a.pgid < b.pgid) {
        return -1;
      } else if (a.pgid === b.pgid) {
        return 0;
      } else {
        return 1;
      }
    });
    return (
      <Row>
        <Col>
          <Collapse defaultActiveKey={procsData[1].name} bordered={false}>
            {procsData.map((proc, i) => {
              // 第一条 proc 不作为日志记录，而是全局日志状态记录
              if (i === 0) {
                return null;
              }
              return (
                <Panel header={proc.name} key={proc.name}>
                  {isRunning ? (
                    <RunningProcLog
                      key={proc.id}
                      logData={logDatas[proc.name]}
                      procData={proc}
                    />
                  ) : (
                    <ProcLog
                      key={proc.id}
                      procData={proc}
                      repoData={repoData}
                    />
                  )}
                </Panel>
              );
            })}
          </Collapse>
        </Col>
      </Row>
    );
  }
}

export default Comp;

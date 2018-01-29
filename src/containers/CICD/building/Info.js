import React from 'react';
import { Row, Col, Collapse, Tabs } from 'antd';

const { Panel } = Collapse;

class Comp extends React.Component {
  static displayName = 'CICDBuilding';
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
  render() {
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
            <p>Branch: master</p>
            <p>Commit: uid87f97s</p>
            <p>这个是上一次的提交 message</p>
          </Col>
          <Col span={6}>
            <p>1个月以前</p>
            <p>2 分 15 秒</p>
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

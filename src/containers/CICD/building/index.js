import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button, Tag, Row, Col, Collapse, Input, List, Tabs } from 'antd';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { API } from '../../../const';

const logger = console;
const { Panel } = Collapse;
const { TabPane } = Tabs;

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
      <Row gutter={16}>
        <Col span={18}>
          <Tabs defaultActiveKey="lastBuild">
            <TabPane tab="最近构建" key="lastBuild">
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
            </TabPane>
            <TabPane tab="分支构建" key="branch">
              <p>分支构建</p>
            </TabPane>
          </Tabs>
        </Col>

        <Col span={6}>
          <p>
            <Input placeholder="搜索" />
          </p>
          <List itemLayout="vertical">
            <List.Item extra={<Button shape="circle" icon="reload" />}>
              <List.Item.Meta
                title="cabernety/application"
                description={
                  <div>
                    <div>branch: master</div>
                    <div>3 天以前</div>
                    <div>2 分 15 秒</div>
                  </div>
                }
              />
            </List.Item>
            <List.Item extra={<Button shape="circle" icon="reload" />}>
              <List.Item.Meta
                title="cabernety/application"
                description={
                  <div>
                    <div>branch: master</div>
                    <div>3 天以前</div>
                    <div>2 分 15 秒</div>
                  </div>
                }
              />
            </List.Item>
            <List.Item extra={<Button shape="circle" icon="reload" />}>
              <List.Item.Meta
                title="cabernety/application"
                description={
                  <div>
                    <div>branch: master</div>
                    <div>3 天以前</div>
                    <div>2 分 15 秒</div>
                  </div>
                }
              />
            </List.Item>
          </List>
        </Col>
      </Row>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

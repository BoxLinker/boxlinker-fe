import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Modal, Tabs, List, Button } from 'antd';
import { Link } from 'react-router';
import Table from '../../../components/Table';
import { API } from '../../../const';

const listData = [];

for (let i = 0; i < 0; i++) {
  listData.push({
    name: `name${i}`,
  });
}
const { TabPane } = Tabs;
const logger = console;
class Comp extends React.Component {
  static displayName = 'CICDModal';
  getList() {
    return (
      <List
        style={{ maxHeight: 350, overflow: 'auto' }}
        dataSource={listData}
        loading
        pagination={{
          pageSize: 10,
          current: 1,
          total: listData.length,
          onChange: () => {},
        }}
        renderItem={item => {
          return (
            <List.Item actions={[<Button>添加</Button>]}>{item.name}</List.Item>
          );
        }}
      />
    );
  }
  getUnbound() {
    return (
      <div>
        <p>
          您还没有绑定 Github, 点击{' '}
          <a href="https://github.com" target="_blank">
            这里
          </a>{' '}
          绑定。
        </p>
        <p>
          已经绑定了？点击 <a>刷新</a> 试试。
        </p>
      </div>
    );
  }
  render() {
    return (
      <Modal
        visible={this.props.visible}
        onCancel={this.props.onClose}
        footer={false}
      >
        <Tabs defaultActiveKey="github">
          <TabPane key="github" tab="Github">
            {this.getList()}
          </TabPane>
        </Tabs>
      </Modal>
    );
  }
}

export default Comp;

import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Collapse, Row, Col, List, Avatar } from 'antd';

import { ServicePanel, ImagePanel, VolumePanel } from './panels';

import './style.css';

const { Panel } = Collapse;

const services = [
  {
    title: 'Ant Design Title 1',
  },
  {
    title: 'Ant Design Title 2',
  },
  {
    title: 'Ant Design Title 3',
  },
  {
    title: 'Ant Design Title 4',
  },
];

class Comp extends React.Component {
  render() {
    return (
      <div>
        <Row gutter={16}>
          <Col span={12}>
            <ServicePanel />
            <ImagePanel />
          </Col>
          <Col span={12}>
            <VolumePanel />
          </Col>
        </Row>
      </div>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

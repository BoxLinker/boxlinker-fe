import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Row, Col } from 'antd';

import { ServicePanel, ImagePanel, VolumePanel } from './panels';

import './style.css';

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

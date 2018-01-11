import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'antd';

import QueryTable from './list';

const logger = console;

class Comp extends React.Component {
  static displayName = 'Services';
  openCreate = () => {
    this.props.navigateTo('/services/create');
  };
  render() {
    return (
      <div>
        <p>
          <Button type="primary" onClick={this.openCreate}>
            新建服务
          </Button>
        </p>
        <QueryTable />
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

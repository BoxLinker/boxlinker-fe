import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import { Button } from 'antd';

import CreateModal from './create';
import QueryTable from './list';

class Comp extends React.Component {
  openCreate = () => {
    if (this.createRef) {
      this.createRef.toggle(true);
    }
  };
  render() {
    return (
      <div>
        <p>
          <Button type="primary" onClick={this.openCreate}>
            新建数据卷
          </Button>
        </p>
        <QueryTable />
        <CreateModal
          ref={ref => {
            this.createRef = ref;
          }}
        />
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

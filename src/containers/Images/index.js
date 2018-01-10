import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
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

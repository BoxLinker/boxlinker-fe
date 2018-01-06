import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import Layout from '../../components/Layout';

class Comp extends React.Component {
  render() {
    return (
      <Layout>
        <button
          onClick={() => {
            this.props.navigateTo('/');
          }}
        >
          Images
        </button>
      </Layout>
    );
  }
}

const Container = connect(null, dispatch => ({
  navigateTo: path => {
    dispatch(push(path));
  },
}))(Comp);

export default Container;

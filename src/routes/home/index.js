import React from 'react';
import Layout from 'components/Layout';
import HomeContainer from './HomeContainer';

async function action() {
  return {
    chunks: ['home'],
    title: '控制台',
    component: (
      <Layout>
        <HomeContainer />
      </Layout>
    ),
  };
}

export default action;

import React from 'react';
import Layout from 'components/Layout';
import HomeContainer from './HomeContainer';

async function action({ url }) {
  return {
    chunks: ['home'],
    title: '控制台',
    component: (
      <Layout path={url}>
        <HomeContainer />
      </Layout>
    ),
  };
}

export default action;

import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ url, params }) {
  return {
    chunks: ['getService'],
    title: '应用详情',
    component: (
      <Layout path={url}>
        <Container name={params.name} />
      </Layout>
    ),
  };
}

export default action;

import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ url }) {
  return {
    chunks: ['application-detail'],
    title: '应用详情',
    component: (
      <Layout path={url}>
        <Container />
      </Layout>
    ),
  };
}

export default action;

import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ url }) {
  return {
    chunks: ['applications'],
    title: '应用',
    component: (
      <Layout path={url}>
        <Container />
      </Layout>
    ),
  };
}

export default action;

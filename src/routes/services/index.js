import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ path }) {
  return {
    chunks: ['applications'],
    title: '应用',
    component: (
      <Layout path={path}>
        <Container />
      </Layout>
    ),
  };
}

export default action;

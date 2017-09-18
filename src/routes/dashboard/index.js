import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ path }) {
  return {
    chunks: ['dashboard'],
    title: '控制台',
    component: (
      <Layout path={path}>
        <Container />
      </Layout>
    ),
  };
}

export default action;

import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action() {
  return {
    chunks: ['demo'],
    title: '控制台',
    component: (
      <Layout>
        <Container />
      </Layout>
    ),
  };
}

export default action;

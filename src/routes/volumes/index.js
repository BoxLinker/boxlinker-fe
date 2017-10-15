import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ path }) {
  return {
    chunks: ['volumes'],
    title: '数据卷',
    component: (
      <Layout path={path}>
        <Container />
      </Layout>
    ),
  };
}

export default action;

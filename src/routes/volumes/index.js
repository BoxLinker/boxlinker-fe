import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ url }) {
  return {
    chunks: ['volumes'],
    title: '数据卷',
    component: (
      <Layout path={url}>
        <Container />
      </Layout>
    ),
  };
}

export default action;

import React from 'react';
import Layout from 'components/Layout';
import Container from './Container';

async function action({ url }) {
  return {
    chunks: ['images'],
    title: '镜像',
    component: (
      <Layout path={url}>
        <Container />
      </Layout>
    ),
  };
}

export default action;

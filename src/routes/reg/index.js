import React from 'react';
import Container from './Container';

async function action() {
  return {
    chunks: ['reg'],
    title: '注册',
    component: <Container />,
  };
}

export default action;

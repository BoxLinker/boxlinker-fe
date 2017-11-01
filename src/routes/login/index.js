import React from 'react';
import Container from './Container';

async function action() {
  return {
    chunks: ['login'],
    title: '登录',
    component: <Container />,
  };
}

export default action;

import React from 'react';
import Container from './Container';

async function action() {
  return {
    chunks: ['pass-reset'],
    title: '修改密码',
    component: <Container />,
  };
}

export default action;

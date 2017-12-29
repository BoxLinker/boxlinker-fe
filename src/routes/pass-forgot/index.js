import React from 'react';
import Container from './Container';

async function action() {
  return {
    chunks: ['pass-forgot'],
    title: '忘记密码',
    component: <Container />,
  };
}

export default action;

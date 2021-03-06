import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

/**
 * 内容主要包括以下几个方面
 * 1. 资源整合信息（应用、存储卷、镜像、[git repo]）
 * 2. 资源监控整合信息（CPU、内存、网络）
 * 3. 通知（监控报警、系统通知等）
 * 4. 账户信息（基本信息、余额）
 * 5. 新闻中心推送文章
 * */

class Comp extends React.Component {
  static contextTypes = {
    event: PropTypes.object.isRequired,
  };
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>Coming soon ...</div>
      </div>
    );
  }
}

export default withStyles(s)(Comp);

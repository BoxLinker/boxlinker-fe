import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import cx from 'classnames';
import s from './index.css';

class BreadCrumb extends React.Component {
  render() {
    return (
      <ol className={cx(s.root, 'breadcrumb')}>
        <li>
          <a href="/">控制台</a>
        </li>
        <li>
          <a href="/">应用列表</a>
        </li>
        <li className="active">测试应用</li>
      </ol>
    );
  }
}

export default withStyles(s)(BreadCrumb);

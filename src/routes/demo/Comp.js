import React from 'react';
// import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';

class Comp extends React.Component {
  render() {
    return (
      <div className={s.root}>
        <div className={s.container}>网站建设中</div>
      </div>
    );
  }
}

export default withStyles(s)(Comp);

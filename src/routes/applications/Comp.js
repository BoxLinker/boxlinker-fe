import React from 'react';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'boxlinker-ui'; // eslint-disable-line
import s from './index.css'; // eslint-disable-line
/* eslint-disable no-script-url */

class Comp extends React.Component {
  render() {
    // console.log('>>>', services);
    return <div>Applications</div>;
  }
}

export default withStyles(s)(Comp);

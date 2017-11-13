import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'boxlinker-ui'; // eslint-disable-line
import s from './index.css'; // eslint-disable-line
/* eslint-disable no-script-url */

class Comp extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    loadServiceDetail: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {
    this.props.loadServiceDetail(this.props.name);
  }
  render() {
    return <div>123</div>;
  }
}

export default withStyles(s)(Comp);

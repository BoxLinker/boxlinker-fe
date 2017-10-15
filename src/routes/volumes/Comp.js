import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'boxlinker-ui'; // eslint-disable-line
import s from './index.css'; // eslint-disable-line
/* eslint-disable no-script-url */

const columns = [
  {
    field: 'name',
    label: '名称',
  },
  {
    field: 'image',
    label: '镜像',
  },
];

class Comp extends React.Component {
  static propTypes = {
    loadPage: PropTypes.func,
    data: PropTypes.shape({
      data: PropTypes.array,
      pagination: PropTypes.object,
    }),
  };
  static defaultProps = {
    loadPage: () => {},
    data: [],
  };
  componentDidMount() {
    this.props.loadPage();
  }
  onLoadPage = pagination => {
    this.props.loadPage(pagination);
  };
  render() {
    const { data } = this.props;
    // console.log('>>>', services);
    return <Grid columns={columns} data={data} onLoad={this.onLoadPage} />;
  }
}

export default withStyles(s)(Comp);

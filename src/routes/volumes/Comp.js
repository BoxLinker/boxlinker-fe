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
    field: 'size',
    label: '大小',
  },
];

class Comp extends React.Component {
  static propTypes = {
    loadPage: PropTypes.func,
    volumes: PropTypes.shape({
      data: PropTypes.array,
      pagination: PropTypes.object,
    }),
  };
  static defaultProps = {
    loadPage: () => {},
    volumes: [],
  };
  componentDidMount() {
    this.props.loadPage();
  }
  onLoadPage = pagination => {
    this.props.loadPage(pagination);
  };
  render() {
    const { volumes } = this.props;
    // console.log('>>>', services);
    return (
      <Grid
        rowKey="name"
        columns={columns}
        data={volumes}
        onLoad={this.onLoadPage}
      />
    );
  }
}

export default withStyles(s)(Comp);

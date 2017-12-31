import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'bui'; // eslint-disable-line
import s from './index.css'; // eslint-disable-line
/* eslint-disable no-script-url */

const columns = [
  {
    field: 'name',
    label: '名称',
  },
  {
    field: 'tag',
    label: 'Tag',
  },
  {
    field: 'size',
    label: '大小',
  },
  {
    field: 'is_private',
    label: '权限',
  },
];

class Comp extends React.Component {
  static propTypes = {
    loadPage: PropTypes.func,
    images: PropTypes.shape({
      data: PropTypes.array,
      pagination: PropTypes.object,
    }),
  };
  static defaultProps = {
    loadPage: () => {},
    images: {},
  };
  componentDidMount() {
    this.props.loadPage();
  }
  onLoadPage = pagination => {
    this.props.loadPage(pagination);
  };
  render() {
    const { images } = this.props;
    return (
      <Grid
        rowKey={item => `${item.name}${item.tag}`}
        columns={columns}
        data={images}
        onLoad={this.onLoadPage}
      />
    );
  }
}

export default withStyles(s)(Comp);

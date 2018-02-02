import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import bFetch from '../../bfetch';

const NOOP = () => {};

class Comp extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    url: PropTypes.string.isRequired,
    rowKey: PropTypes.string.isRequired,
    params: PropTypes.object,
    onLoad: PropTypes.func,
    fetchOptions: PropTypes.object,
  };
  static defaultProps = {
    params: {},
    onLoad: NOOP,
    fetchOptions: {},
  };
  state = {
    loading: false,
    data: null,
    pagination: {},
  };
  componentDidMount() {
    this.fetch();
  }
  async fetch({ current, pageSize } = {}) {
    this.setState({
      loading: true,
    });
    const { url } = this.props;
    try {
      const res = await bFetch(url, {
        params: {
          currentPage: current,
          pageCount: pageSize,
          ...this.props.params,
        },
        ...this.props.fetchOptions,
      });
      const { data, pagination } = res.results || {};
      this.setState({
        loading: false,
        data,
        pagination: {
          current: pagination.currentPage,
          total: pagination.totalCount,
        },
      });
      this.props.onLoad(null, res);
    } catch (e) {
      this.setState({
        loading: false,
      });
      this.props.onLoad(e, null);
    }
    // const res = await bFetch(url, {
    //   params: {
    //     currentPage: current,
    //     pageCount: pageSize,
    //     ...this.props.params,
    //   },
    // })
    //   .then(res => {
    //     const { data, pagination } = res.results || {};
    //     this.setState({
    //       data,
    //       pagination: {
    //         current: pagination.currentPage,
    //         total: pagination.totalCount,
    //       },
    //     });
    //     return res;
    //   })
    //   .catch(e => {
    //     console.log('err: ', e);
    //     return e;
    //   })
    //   .finally(() => {
    //     console.log('=>>', arguments);
    //     this.setState(
    //       {
    //         loading: false,
    //       },
    //       () => {
    //         this.props.onLoad();
    //       },
    //     );
    //   });
  }
  handleTableChange = pagination => {
    this.fetch(pagination);
  };
  render() {
    const { columns, rowKey } = this.props;
    const { loading, data, pagination } = this.state;
    return (
      <Table
        {...this.props}
        rowKey={rowKey}
        loading={loading}
        bordered
        dataSource={data}
        columns={columns}
        pagination={pagination}
        onChange={this.handleTableChange}
      />
    );
  }
}

export default Comp;

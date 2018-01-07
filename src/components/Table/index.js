import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import bFetch from '../../bfetch';

class Comp extends React.Component {
  static propTypes = {
    columns: PropTypes.arrayOf(PropTypes.object).isRequired,
    url: PropTypes.string.isRequired,
    rowKey: PropTypes.string.isRequired,
  };
  static defaultProps = {};
  state = {
    loading: false,
    data: null,
    pagination: {},
  };
  componentDidMount() {
    this.fetch();
  }
  fetch({ current, pageSize } = {}) {
    this.setState({
      loading: true,
    });
    const { url } = this.props;
    bFetch(url, {
      params: {
        currentPage: current,
        pageCount: pageSize,
      },
    })
      .then(res => {
        const { data, pagination } = res.results || {};
        this.setState({
          data,
          pagination: {
            current: pagination.currentPage,
            total: pagination.totalCount,
          },
        });
      })
      .finally(() => {
        this.setState({
          loading: false,
        });
      });
  }
  handleTableChange = pagination => {
    this.fetch(pagination);
  };
  render() {
    const { columns, rowKey } = this.props;
    const { loading, data, pagination } = this.state;
    return (
      <Table
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

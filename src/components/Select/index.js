import React from 'react';
import PropTypes from 'prop-types';
import { Select } from 'antd';
import bFetch from '../../bfetch';

const { Option } = Select;

class Comp extends React.Component {
  static propTypes = {
    url: PropTypes.string.isRequired,
    params: PropTypes.object,
  };
  static defaultProps = {
    params: {},
  };
  state = {
    data: null,
    pagination: {},
  };
  constructor(props) {
    super(props);
    this.state = props.data || [];
  }
  componentDidMount() {
    this.fetch();
  }
  fetch({ current, pageSize } = {}) {
    this.setState({
      loading: true,
    });
    const { url, params } = this.props;
    bFetch(url, {
      params: {
        ...params,
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
  handleChange = pagination => {
    this.fetch(pagination);
  };
  getOptions() {
    const { data = [] } = this.state;
    return data.map(item => {
      return <Option value={item.value}>{item.label}</Option>;
    });
  }
  render() {
    return <Select onChange={this.handleChange}>{this.getOptions()}</Select>;
  }
}

export default Comp;

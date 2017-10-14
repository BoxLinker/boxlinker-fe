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
  {
    field: 'configure',
    label: '配置',
    render(v, item) {
      return <div>{`cpu:${item.cpu} 内存:${item.memory}`}</div>;
    },
  },
  {
    field: 'ports',
    label: '端口',
    render(ports) {
      if (!ports || !ports.length) {
        return <span>&nbsp;</span>;
      }
      return (
        <div>
          {ports.map(p => {
            const { port, protocol, path } = p;
            return (
              <div
                key={`${port}${Math.ceil(Math.random() * 1000)}`}
              >{`${port}/${protocol}${path ? ` - ${path}` : ''}`}</div>
            );
          })}
        </div>
      );
    },
  },
  {
    field: 'operate',
    label: '操作',
    render() {
      return (
        <div className="btn-group dropdown">
          <button className="btn btn-sm btn-primary">开启</button>
          <button
            className="btn btn-sm btn-primary dropdown-toggle dropdown-toggle-icon"
            data-toggle="dropdown"
          >
            <i className="dropdown-caret" />
          </button>
          <ul className="dropdown-menu">
            <li>
              <a href="javascript:void(0)">删除</a>
            </li>
          </ul>
        </div>
      );
    },
  },
];

class Comp extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func,
  };
  static propTypes = {
    loadServices: PropTypes.func,
    services: PropTypes.shape({
      data: PropTypes.array,
      pagination: PropTypes.object,
    }),
  };
  static defaultProps = {
    loadServices: () => {},
    services: [],
  };
  componentDidMount() {
    this.props.loadServices(this.context.fetch);
  }
  onLoadPage = pagination => {
    this.props.loadServices(this.context.fetch, pagination);
  };
  render() {
    const { services } = this.props;
    // console.log('>>>', services);
    return <Grid columns={columns} data={services} onLoad={this.onLoadPage} />;
  }
}

export default withStyles(s)(Comp);

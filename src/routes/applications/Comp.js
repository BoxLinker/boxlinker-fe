import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'boxlinker-ui'; // eslint-disable-line
import s from './index.css';

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

/* eslint-disable no-script-url */
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
  render1() {
    this._ = this.props.services;
    return (
      <div className={s.root}>
        <div className={s.container}>
          <div className="panel">
            <div className="panel-heading">
              <h3 className="panel-title">应用列表</h3>
            </div>
            <div className="panel-body">
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th>名称</th>
                    <th>镜像</th>
                    <th>配置</th>
                    <th>操作</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Test App</td>
                    <td>index.boxlinker.com/library/test-app:latest</td>
                    <td>64M</td>
                    <td>
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
                    </td>
                  </tr>
                  <tr>
                    <td>Test App</td>
                    <td>index.boxlinker.com/library/test-app:latest</td>
                    <td>64M</td>
                    <td>
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
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="clearfix">
                <ul className="pagination pull-right">
                  <li className="page-pre">
                    <a href="javascript:void(0)">&lt;</a>
                  </li>
                  <li className="page-number">
                    <a href="javascript:void(0)">1</a>
                  </li>
                  <li className="page-number active">
                    <a href="javascript:void(0)">2</a>
                  </li>
                  <li className="page-next">
                    <a href="javascript:void(0)">&gt;</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    const { services } = this.props;
    // console.log('>>>', services);
    return <Grid columns={columns} data={services} />;
  }
}

export default withStyles(s)(Comp);

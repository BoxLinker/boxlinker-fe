import React from 'react';
import PropTypes from 'prop-types';
/* eslint-disable import/no-unresolved, import/extensions */
import { Select } from 'boxlinker-ui';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { URL_SEARCH_IMAGE } from '../../constants';
import s from './AppForm.pcss';

const hardwareConfiguration = [
  {
    label: '64M',
    value: 1,
  },
  {
    label: '128M',
    value: 2,
  },
  {
    label: '256M',
    value: 3,
  },
  {
    label: '512M',
    value: 4,
  },
];

class AppForm extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    [
      'onSearchImage',
      'onSearchImageItemClick',
      'onHardwareConfigureItemClick',
    ].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
    this.state = {
      image: '',
      searchedImages: [],
      hardwareConfigure: 1,
    };
  }
  onSearchImageItemClick(item) {
    if (!item) return;
    this.setState({
      image: item.id,
    });
  }
  onSearchImage() {
    this.context
      .fetch(URL_SEARCH_IMAGE, {
        method: 'GET',
      })
      .then(json => {
        this.setState({
          searchedImages: json.results,
        });
      });
  }
  onHardwareConfigureItemClick(item) {
    if (!item) return;
    this.setState({
      hardwareConfigure: item.value,
    });
  }
  render() {
    return (
      <div className="panel bord-no" style={{ boxShadow: 'none' }}>
        <div className="panel-heading">
          <h3 className="panel-title">新建应用</h3>
        </div>
        <div className="panel-body">
          <div className="row">
            <div className="col-sm-6">
              <div className="form-group">
                <p className="control-label">应用名称</p>
                <input type="text" className="form-control" />
              </div>
            </div>
            <div className="col-sm-6">
              <div className="form-group">
                <p className="control-label">选择内存</p>
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择内存配置"
                  value={this.state.hardwareConfigure}
                  labelKey="label"
                  valuekey="value"
                  onItemClick={this.onHardwareConfigureItemClick}
                  data={hardwareConfiguration}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="form-group">
                <p className="control-label">选择镜像</p>
                <Select
                  style={{ width: '100%' }}
                  placeholder="请选择镜像"
                  value={this.state.image}
                  getLabel={item => `${item.name}:${item.tag}`}
                  valueKey="id"
                  searchable
                  onSearchInputChange={this.onSearchImage}
                  onItemClick={this.onSearchImageItemClick}
                  data={this.state.searchedImages}
                />
              </div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm-12">
              <div className="pull-right">
                <button
                  type="button"
                  className="btn btn-link"
                  style={{ marginRight: '7px' }}
                >
                  高级配置
                </button>
                <button type="submit" className="btn btn-primary">
                  创建
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default withStyles(s)(AppForm);

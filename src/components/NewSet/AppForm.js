import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
/* eslint-disable import/no-unresolved, import/extensions */
import { Form, FormElement, Select } from 'boxlinker-ui';
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
      'onSubmit',
      'onElementChange',
      'onElementErrMsg',
    ].forEach(fn => {
      this[fn] = this[fn].bind(this);
    });
    this.state = {
      appName: '',
      appNameErrMsg: '',
      appImage: '',
      appImageErrMsg: '',
      appHardwareConfigure: 1,
      appHardwareConfigureErrMsg: '',
      searchedImages: [],
    };
  }
  onSearchImageItemClick(item) {
    if (!item) return;
    this.setState({
      appImage: item.id,
    });
    this.refAppImage.validate();
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
      appHardwareConfigure: item.value,
    });
    this.refAppHardwareConfigure.validate();
  }
  onSubmit(data, err) {
    this._ = [data, err];
  }
  onElementChange(e) {
    const v = e.target.value;
    switch (e.target.name) {
      case 'appName':
        this.setState({
          appName: v,
        });
        this.refAppName.validate();
        break;
      default:
    }
  }
  onElementErrMsg(err) {
    this.setState({
      [`${err[0]}ErrMsg`]: err[1],
    });
  }
  getAppNameUI() {
    const state = this.state;
    const appNameErr = state.appNameErrMsg;

    return (
      <FormElement
        name="appName"
        rules={['required:应用名称不能为空', 'regexName:格式不正确(字母、数字、下划线, 16 位以内)']}
        ref={ref => {
          this.refAppName = ref;
        }}
        onErrMsg={this.onElementErrMsg}
        getValue={() => this.state.appName}
      >
        <div className={cx('form-group', appNameErr ? 'has-error' : '')}>
          <p className="control-label">应用名称</p>
          <input
            name="appName"
            type="text"
            className="form-control"
            onChange={this.onElementChange}
          />
          {appNameErr
            ? <p className="help-block">
                {appNameErr}
              </p>
            : null}
        </div>
      </FormElement>
    );
  }
  getAppHardwareConfigureUI() {
    const state = this.state;
    const appHardwareConfigureErrMsg = state.appHardwareConfigureErrMsg;

    return (
      <FormElement
        name="appHardwareConfigure"
        ref={ref => {
          this.refAppHardwareConfigure = ref;
        }}
        rules={['required:您必须选择一项配置']}
        onErrMsg={this.onElementErrMsg}
        getValue={() => this.state.appHardwareConfigure}
      >
        <div
          className={cx(
            'form-group',
            appHardwareConfigureErrMsg ? 'has-error' : '',
          )}
        >
          <p className="control-label">选择内存</p>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择内存配置"
            value={this.state.appHardwareConfigure}
            labelKey="label"
            valuekey="value"
            onItemClick={this.onHardwareConfigureItemClick}
            data={hardwareConfiguration}
          />
          {appHardwareConfigureErrMsg
            ? <p className="help-block">
                {appHardwareConfigureErrMsg}
              </p>
            : null}
        </div>
      </FormElement>
    );
  }
  getAppImageUI() {
    const state = this.state;
    const appImageErr = state.appImageErrMsg;

    return (
      <FormElement
        name="appImage"
        rules={['required']}
        ref={ref => {
          this.refAppImage = ref;
        }}
        getValue={() => this.state.appImage}
        onErrMsg={this.onElementErrMsg}
      >
        <div className={cx('form-group', appImageErr ? 'has-error' : '')}>
          <p className="control-label">选择镜像</p>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择镜像"
            value={this.state.appImage}
            getLabel={item => `${item.name}:${item.tag}`}
            valueKey="id"
            searchable
            onSearchInputChange={this.onSearchImage}
            onItemClick={this.onSearchImageItemClick}
            data={this.state.searchedImages}
          />
          {appImageErr
            ? <p className="help-block">
                {appImageErr}
              </p>
            : null}
        </div>
      </FormElement>
    );
  }
  render() {
    return (
      <div className="panel bord-no" style={{ boxShadow: 'none' }}>
        <div className="panel-heading">
          <h3 className="panel-title">新建应用</h3>
        </div>
        <Form
          onSubmit={this.onSubmit}
          getElements={() => [
            this.refAppName,
            this.refAppImage,
            this.refAppHardwareConfigure,
          ]}
        >
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-6">
                {this.getAppNameUI()}
              </div>
              <div className="col-sm-6">
                {this.getAppHardwareConfigureUI()}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                {this.getAppImageUI()}
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
        </Form>
      </div>
    );
  }
}

export default withStyles(s)(AppForm);

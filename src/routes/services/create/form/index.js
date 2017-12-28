import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
/* eslint-disable import/no-unresolved, import/extensions */
import { Form, FormElement, Select } from 'bui';
import { API } from 'const';
import bFetch from 'bfetch';
import FormPorts from './FormPorts';

const log = console;

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

const getImageURIByID = (id, images) => {
  for (let i = 0; i < images.length; i += 1) {
    const image = images[i];
    if (image.id === id) {
      return `index.boxlinker.com/${image.namespace}/${image.name}:${image.tag}`;
    }
  }
  return '';
};

const getMemoryByID = (id, config) => {
  for (let i = 0; i < config.length; i += 1) {
    const item = config[i];
    if (item.value === id) {
      return item.label;
    }
  }
  return config[0].label;
};

const getPortLineData = item => ({
  id: `${Math.ceil(Math.random() * 10000000)}`,
  ...item,
});

class AppForm extends React.Component {
  static contextTypes = {
    event: PropTypes.object,
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
      appPorts: [
        {
          id: '12312312',
          port: 80,
          path: '/',
        },
      ],
      appPortsErrMsg: '',
    };
  }
  onSearchImageItemClick(item) {
    if (!item) return;
    this.setState({
      appImage: item.id,
    });
    this.refAppImage.validate();
  }
  onSearchImage = async (value, that) => {
    try {
      const res = await bFetch(API.REGISTRY.SEARCH_IMAGE, {
        method: 'GET',
        params: {
          value,
        },
      });
      that.setState({
        searchedImages: res.results,
      });
    } catch (err) {
      log.error('search image err: ', err);
    }
  };
  onHardwareConfigureItemClick(item) {
    if (!item) return;
    this.setState({
      appHardwareConfigure: item.value,
    });
    this.refAppHardwareConfigure.validate();
  }
  onSubmit(data, err) {
    if (err) {
      return;
    }
    const { searchedImages } = this.state;
    const ports = data.appPorts.map(item => {
      const { port, path } = item;
      const protocol = 'TCP';
      const name = `tcp${port}`;
      return {
        name,
        port,
        path,
        protocol,
      };
    });
    const pData = {
      name: data.appName,
      image: getImageURIByID(data.appImage, searchedImages),
      cpu: '200m',
      memory: getMemoryByID(data.appHardwareConfigure, hardwareConfiguration),
      ports,
    };
    this.context
      .fetch(API.SERVICE.CREATE, {
        method: 'POST',
        body: JSON.stringify(pData),
      })
      .then(() => {
        this.context.event.emit('app.notification', {
          msg: `服务 ${pData.name} 创建成功!`,
          type: 'success',
        });
      });
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
  onRemovePort = id => {
    const { appPorts } = this.state;
    for (let i = 0; i < appPorts.length; i += 1) {
      if (appPorts[i].id === id) {
        appPorts.splice(i, 1);
        break;
      }
    }
    this.setState({
      appPorts,
    });
  };
  onAddPort = () => {
    const { appPorts } = this.state;
    appPorts.push(
      getPortLineData({
        port: 0,
        path: '',
      }),
    );
    this.setState({
      appPorts,
    });
  };
  onAppPortsChange = appPorts => {
    this.setState({
      appPorts,
    });
  };
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
          <h5 className="control-label">应用名称</h5>
          <input
            name="appName"
            type="text"
            className="form-control"
            onChange={this.onElementChange}
          />
          {appNameErr ? <p className="help-block">{appNameErr}</p> : null}
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
          <h5 className="control-label">选择内存</h5>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择内存配置"
            value={this.state.appHardwareConfigure}
            labelKey="label"
            valuekey="value"
            onItemClick={this.onHardwareConfigureItemClick}
            data={hardwareConfiguration}
          />
          {appHardwareConfigureErrMsg ? (
            <p className="help-block">{appHardwareConfigureErrMsg}</p>
          ) : null}
        </div>
      </FormElement>
    );
  }
  getAppPortsUI() {
    const { appPorts } = this.state;
    return (
      <FormElement
        name="appPorts"
        ref={ref => {
          this.refAppPorts = ref;
        }}
        getValue={() => this.state.appPorts}
        onErrMsg={this.onElementErrMsg}
      >
        <FormPorts
          ports={appPorts}
          onChange={this.onAppPortsChange}
          onAdd={this.onAddPort}
          onRemove={this.onRemovePort}
          errMsg={this.state.appPortsErrMsg}
        />
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
          <h5 className="control-label">选择镜像</h5>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择镜像"
            value={this.state.appImage}
            getLabel={item => `${item.name}:${item.tag}`}
            valueKey="id"
            searchable
            onSearchInputChange={e => {
              this.onSearchImage(e, this);
            }}
            onItemClick={this.onSearchImageItemClick}
            data={this.state.searchedImages || []}
          />
          {appImageErr ? <p className="help-block">{appImageErr}</p> : null}
        </div>
      </FormElement>
    );
  }
  render() {
    return (
      <div className="panel bord-no" style={{ boxShadow: 'none' }}>
        {/* <div className="panel-heading">
          <h3 className="panel-title">新建应用</h3>
        </div> */}
        <Form
          onSubmit={this.onSubmit}
          getElements={() => [
            this.refAppName,
            this.refAppImage,
            this.refAppHardwareConfigure,
            this.refAppPorts,
          ]}
        >
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-6">{this.getAppNameUI()}</div>
              <div className="col-sm-6">{this.getAppHardwareConfigureUI()}</div>
            </div>
            <div className="row">
              <div className="col-sm-12">{this.getAppImageUI()}</div>
            </div>
            <div className="row">
              <div className="col-sm-12">{this.getAppPortsUI()}</div>
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

export default AppForm;

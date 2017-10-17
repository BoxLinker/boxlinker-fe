import React from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
/* eslint-disable import/no-unresolved, import/extensions, no-console */
import { Form, FormElement, Select } from 'boxlinker-ui';
import { connect } from 'react-redux';
import { createVolume } from 'actions/volumes';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => ({
  createVolume: form => {
    dispatch(createVolume(form));
  },
});

const sizeConfig = [
  {
    label: '1Gi',
    value: '1Gi',
  },
  {
    label: '2Gi',
    value: '2Gi',
  },
  {
    label: '5Gi',
    value: '5Gi',
  },
  {
    label: '10Gi',
    value: '10Gi',
  },
];

class VolumeForm extends React.Component {
  static propTypes = {
    createVolume: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      nameErrMsg: '',
      size: '',
      sizeErrMsg: '',
    };
  }
  onElementChange = e => {
    const v = e.target.value;
    switch (e.target.name) {
      case 'name':
        this.setState({
          name: v,
        });
        this.refName.validate();
        break;
      default:
    }
  };
  onElementErrMsg = err => {
    this.setState({
      [`${err[0]}ErrMsg`]: err[1],
    });
  };
  onSizeConfigItemClick = item => {
    if (!item) return;
    this.setState({
      size: item.value,
    });
    this.refSize.validate();
  };
  onSubmit = (data, err) => {
    if (err) {
      return;
    }
    console.log('data>', data);
    this.props.createVolume(data);
  };
  getNameEle() {
    const { nameErrMsg } = this.state;
    return (
      <FormElement
        name="name"
        rules={['required:数据卷名称不能为空', 'regexName:格式不正确(字母、数字、下划线, 16 位以内)']}
        ref={ref => {
          this.refName = ref;
        }}
        onErrMsg={this.onElementErrMsg}
        getValue={() => this.state.name}
      >
        <div className={cx('form-group', nameErrMsg ? 'has-error' : '')}>
          <h5 className="control-label">数据卷名称</h5>
          <input
            name="name"
            type="text"
            className="form-control"
            onChange={this.onElementChange}
          />
          {nameErrMsg
            ? <p className="help-block">
                {nameErrMsg}
              </p>
            : null}
        </div>
      </FormElement>
    );
  }
  getSizeEle() {
    const { sizeErrMsg } = this.state;
    return (
      <FormElement
        name="size"
        ref={ref => {
          this.refSize = ref;
        }}
        rules={['required:您必须选择一项容量']}
        onErrMsg={this.onElementErrMsg}
        getValue={() => this.state.size}
      >
        <div className={cx('form-group', sizeErrMsg ? 'has-error' : '')}>
          <h5 className="control-label">选择内存</h5>
          <Select
            style={{ width: '100%' }}
            placeholder="请选择容量配置"
            value={this.state.size}
            labelKey="label"
            valuekey="value"
            onItemClick={this.onSizeConfigItemClick}
            data={sizeConfig}
          />
          {sizeErrMsg
            ? <p className="help-block">
                {sizeErrMsg}
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
          <h3 className="panel-title">新建数据卷</h3>
        </div>
        <Form
          onSubmit={this.onSubmit}
          getElements={() => [this.refName, this.refSize]}
        >
          <div className="panel-body">
            <div className="row">
              <div className="col-sm-6">
                {this.getNameEle()}
              </div>
              <div className="col-sm-6">
                {this.getSizeEle()}
              </div>
            </div>
            <div className="row">
              <div className="col-sm-12">
                <div className="pull-right">
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

export default connect(mapStateToProps, mapDispatchToProps)(VolumeForm);

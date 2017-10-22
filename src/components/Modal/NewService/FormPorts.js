import React from 'react';
import PropTypes from 'prop-types';
import FormPort from './FormPort';

export default class AppFormPorts extends React.Component {
  static propTypes = {
    ports: PropTypes.arrayOf(
      PropTypes.shape({
        port: PropTypes.number,
        path: PropTypes.string,
      }),
    ),
    errMsg: PropTypes.string,
    onChange: PropTypes.func,
    onAdd: PropTypes.func,
    onRemove: PropTypes.func,
  };
  static defaultProps = {
    ports: [],
    onChange: () => {},
    onAdd: () => {},
    onRemove: () => {},
    errMsg: '',
  };
  onChange = item => {
    const { ports } = this.props;
    const { id, port, path } = item;
    for (let i = 0; i < ports.length; i += 1) {
      if (ports[i].id === id) {
        ports[i] = {
          ...ports[i],
          port,
          path,
        };
      }
    }
    this.props.onChange(ports);
  };
  onRemove = e => {
    const { portId } = e.currentTarget.dataset;
    this.props.onRemove(portId);
  };
  getPortsComp() {
    const { ports } = this.props;
    /* eslint-disable react/no-array-index-key */
    return ports.map(item =>
      <FormPort
        data={item}
        key={item.id}
        onChange={this.onChange}
        optBtn={
          ports.length > 1
            ? <button
                type="button"
                data-port-id={item.id}
                className="btn btn-sx btn-default"
                onClick={this.onRemove}
              >
                <i className="fa fa-minus" />
              </button>
            : null
        }
      />,
    );
  }
  render() {
    const { errMsg } = this.props;
    return (
      <div className={`form-group ${errMsg ? 'has-error' : ''}`}>
        <h5 className="control-label">端口设置</h5>
        <table className="table table-vcenter table-bordered mar-no">
          <thead>
            <tr>
              <td>端口</td>
              <td>协议</td>
              <td>访问路径</td>
              <td>&nbsp;</td>
            </tr>
          </thead>
          <tbody>
            {this.getPortsComp()}
          </tbody>
        </table>
        <button
          type="button"
          className="btn btn-sx btn-default"
          onClick={this.props.onAdd}
        >
          <i className="fa fa-plus" />&nbsp;添加端口
        </button>
        {errMsg
          ? <p className="help-block">
              {errMsg}
            </p>
          : null}
      </div>
    );
  }
}

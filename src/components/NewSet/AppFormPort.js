import React from 'react';
import PropTypes from 'prop-types';

export default class AppFormPort extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string,
      port: PropTypes.number,
      path: PropTypes.string,
    }),
    optBtn: PropTypes.element,
    onChange: PropTypes.func,
  };
  static defaultProps = {
    data: null,
    optBtn: null,
    onChange: () => {},
  };
  onChange(port, path) {
    this.props.onChange({
      ...this.props.data,
      port,
      path,
    });
  }
  onPortChange = e => {
    const value = e.target.value;
    if (isNaN(value)) {
      return;
    }
    this.onChange(Number(value), this.props.data.path);
  };
  onPathChange = e => {
    this.onChange(this.props.data.port, e.target.value);
  };
  render() {
    const { port, path } = this.props.data;
    return (
      <tr>
        <td>
          <input
            placeholder="端口"
            className="form-control"
            value={port}
            onChange={this.onPortChange}
          />
        </td>
        <td>TCP</td>
        <td>
          <input
            placeholder="路径"
            className="form-control"
            value={path}
            onChange={this.onPathChange}
          />
        </td>
        <td>{this.props.optBtn}</td>
      </tr>
    );
  }
}

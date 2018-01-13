import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'js-cookie';
import { API, BaseURL } from '../../../../const';
import bFetch from '../../../../bfetch';
import MemoryForm from './Memory';
import ImageForm from './Image';
import PortsForm from './Ports';

export default class extends React.Component {
  static propTypes = {
    rowKey: PropTypes.string,
    rowValue: PropTypes.string,
  };
  static defaultProps = {
    rowKey: 'id',
    rowValue: 'value',
  };
  state = {
    baseinfo: null,
  };
  componentDidMount() {
    this.onLoad();
  }
  async onLoad() {
    const { svcName } = this.props;
    try {
      const res = await bFetch(API.SERVICE.GET(svcName));
      const ports = res.results.ports;
      if (ports) {
        res.results.ports = ports.map((port, key) => {
          return {
            ...port,
            key: `${key}`,
          };
        });
      }
      this.setState({
        baseinfo: res.results,
      });
    } catch (err) {
      console.error('dashboard services panel ', err);
    }
  }
  onPortsSubmit = data => {
    console.log('onPortsSubmit', data);
  };
  onImageSubmit = data => {
    console.log('onImageSubmit', data);
  };
  onMemorySubmit = data => {
    console.log('onMemorySubmit', data);
  };
  render() {
    const { baseinfo } = this.state;
    if (!baseinfo) {
      return <div>加载中...</div>;
    }
    return (
      <div>
        <MemoryForm value={baseinfo.memory} onSubmit={this.onMemorySubmit} />
        <ImageForm value={baseinfo.image} onSubmit={this.onImageSubmit} />
        <PortsForm value={baseinfo.ports} onSubmit={this.onPortsSubmit} />
      </div>
    );
  }
}

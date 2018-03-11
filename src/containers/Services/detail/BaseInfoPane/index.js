import React from 'react';
import PropTypes from 'prop-types';
import MemoryForm from './Memory';
import ImageForm from './Image';
import PortsForm from './Ports';
import HostForm from './Host';

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
  focus() {}
  blur() {}
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
    const { svcDetail } = this.props;
    if (!svcDetail) {
      return <div>加载中...</div>;
    }
    return (
      <div>
        <MemoryForm value={svcDetail.memory} onSubmit={this.onMemorySubmit} />
        <ImageForm value={svcDetail.image} onSubmit={this.onImageSubmit} />
        <HostForm value={svcDetail.host} onSubmit={this.onHostSubmit} />
        <PortsForm value={svcDetail.ports} onSubmit={this.onPortsSubmit} />
      </div>
    );
  }
}

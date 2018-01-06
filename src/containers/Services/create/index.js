import React from 'react';
import { Modal } from 'antd';
import CreateForm from './form';

export default class extends React.Component {
  state = {
    visible: false,
  };
  toggle(visible) {
    this.setState({
      visible,
    });
  }
  submit = () => {};
  render() {
    return (
      <Modal
        title="新建服务"
        visible={this.state.visible}
        onOk={this.submit}
        onCancel={() => {
          this.toggle(false);
        }}
      >
        <CreateForm />
      </Modal>
    );
  }
}

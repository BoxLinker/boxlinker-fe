import React from 'react';
import CreateForm from './form';

export default class extends React.Component {
  state = {
    visible: false,
  };
  onSubmit = () => {
    console.log('>>>>>>');
    if (!this.formRef) {
      return;
    }
    this.formRef.validateFields((err, values) => {
      if (err) {
        return;
      }
      console.log('values', values);
    });
  };
  onCancel = () => {
    this.setState({
      visible: false,
    });
  };
  toggle(visible) {
    this.setState({
      visible,
    });
  }
  submit = () => {};
  render() {
    const { visible } = this.state;
    return (
      <CreateForm
        ref={ref => {
          this.formRef = ref;
        }}
        visible={visible}
        onCreate={this.onSubmit}
        onCancel={this.onCancel}
      />
    );
  }
}

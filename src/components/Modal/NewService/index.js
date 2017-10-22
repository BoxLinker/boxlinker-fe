import React from 'react';
import PropTypes from 'prop-types';
// import { Modal } from 'boxlinker-ui';
import { Modal } from 'react-bootstrap';
import ServiceForm from './Form';

export default class NewServiceModal extends React.Component {
  static contextTypes = {
    event: PropTypes.object,
  };
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
    };
  }
  componentDidMount() {
    this.context.event.on('app.newService.show', this.show);
    this.context.event.on('app.newService.toggle', this.toggle);
  }
  componentWillUnmount() {
    this.context.event.off('app.newService.show', this.show);
    this.context.event.off('app.newService.toggle', this.toggle);
  }
  toggle = () => {
    this.setState({ visible: !this.state.visible });
  };
  show = () => {
    this.setState({ visible: true });
  };
  render() {
    const { visible } = this.state;
    return (
      <Modal show={visible}>
        <Modal.Header closeButton>
          <Modal.Title>新建服务</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ServiceForm />
        </Modal.Body>
      </Modal>
    );
  }
}

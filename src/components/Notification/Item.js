import React from 'react';
import PropTypes from 'prop-types';

export default class Item extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      id: PropTypes.string,
      msg: PropTypes.string,
      type: PropTypes.string,
    }).isRequired,
    onRemove: PropTypes.func,
  };
  static defaultProps = {
    onRemove: () => {},
  };
  constructor(props) {
    super(props);
    this.state = {
      cls: 'fadeIn',
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({
        cls: 'fadeOut',
      });
      setTimeout(() => {
        this.props.onRemove(this.props.data.id);
      }, 2000);
    }, 5000);
  }
  render() {
    const { id, msg, type } = this.props.data;
    return (
      <div
        key={id}
        className={`alert alert-${type} animated ${this.state.cls}`}
      >
        <button className="close" data-dismiss="alert">
          <i className="pci-cross pci-circle" />
        </button>
        {msg}
      </div>
    );
  }
}

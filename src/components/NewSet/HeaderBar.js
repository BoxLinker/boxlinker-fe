import React from 'react';
import PropTypes from 'prop-types';

class HeaderBar extends React.Component {
  render() {
    return (
      <div className="pad-hor bord-btm clearfix bg-dark">
        <div className="pull-right pad-top">
          <button
            onClick={() => {
              this.props.onClose();
            }}
            className="btn btn-trans"
          >
            <i className="pci-cross pci-circle icon-lg" />
          </button>
        </div>
        <div className="media">
          <div className="media-left">
            <i className="fa fa-home icon-2x" />
          </div>
          <div className="media-body">
            <span className="text-semibold text-lg text-uppercase">新建</span>
            <p className="text-muted text-xs">在这里，你可以新建任何您需要的资源对象.</p>
          </div>
        </div>
      </div>
    );
  }
}

HeaderBar.propTypes = {
  onClose: PropTypes.func,
};

HeaderBar.defaultProps = {
  onClose: () => {},
};

export default HeaderBar;

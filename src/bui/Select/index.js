import React from 'react';
import PropTypes from 'prop-types';
import SimpleSelect from './SimpleSelect';

class Select extends React.Component {
  static propTypes = {
    searchable: PropTypes.bool,
    placeholder: PropTypes.string,
    clearIcon: PropTypes.bool,
    children: PropTypes.any, //eslint-disable-line
  };
  static defaultProps = {
    searchable: false,
    placeholder: '',
    clearIcon: false,
    children: null,
  };
  getClearIcon() {
    return this.props.clearIcon ? (
      <span className="bui-select-renderer-clear">x</span>
    ) : null;
  }
  render() {
    const { searchable, children } = this.props;
    const { open } = this.state;
    return (
      <div
        className={`bui-select ${searchable ? 'bui-select-searchable' : ''}`}
      >
        <div className={`bui-select-wrapper ${open ? 'open' : ''}`}>
          <div className="bui-selection dropdown" data-toggle="dropdown">
            <div className="bui-select-renderer">{this.getClearIcon()}</div>
            <div className="bui-select-arrow">
              <b />
            </div>
          </div>
        </div>
        <div className="dropdown-menu bui-dropdown">
          <div className="bui-dropdown-search">
            <input
              className="form-control"
              placeholder={this.props.placeholder}
              defaultValue=""
              onChange={this.onSearchInputChange}
            />
          </div>
          <div className="bui-dropdown-results">
            <ul className="bui-dropdown-results-options">{children}</ul>
          </div>
        </div>
      </div>
    );
  }
}

Select.SimpleSelect = SimpleSelect;

export default Select;

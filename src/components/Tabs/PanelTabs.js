import React from 'react';
import PropTypes from 'prop-types';

const activeCls = (tab, active) => (tab === active ? 'active' : '');

class PanelTabs extends React.Component {
  static propTypes = {
    activeKey: PropTypes.string,
    title: PropTypes.string.isRequired,
    onSwitchTab: PropTypes.func,
    tabs: PropTypes.arrayOf(
      PropTypes.shape({
        label: PropTypes.string,
        key: PropTypes.string,
        tabView: PropTypes.element,
      }),
    ).isRequired,
  };
  static defaultProps = {
    activeKey: '',
    onSwitchTab: () => {},
  };
  constructor(props) {
    super(props);
    const { tabs } = this.props;
    let { activeKey } = this.props;
    if (!activeKey) {
      activeKey = tabs[0].key;
    }
    this.state = {
      activeKey,
    };
  }
  getTabNav() {
    const { tabs } = this.props;
    const { activeKey } = this.state;
    return (
      <ul className="nav nav-tabs">
        {tabs.map(item => (
          <li key={item.key} className={activeCls(item.key, activeKey)}>
            <a
              href="javascript:void(0)" //eslint-disable-line
              onClick={() => {
                this.switchTab(item.key);
              }}
            >
              {item.label}
            </a>
          </li>
        ))}
      </ul>
    );
  }
  getTabBody() {
    const { tabs } = this.props;
    const { activeKey } = this.state;
    return (
      <div className="tab-content">
        {tabs.map(tab => (
          <div
            key={tab.key}
            className={`tab-pane fade ${tab.key === activeKey
              ? 'active in'
              : ''}`}
          >
            {tab.tabView}
          </div>
        ))}
      </div>
    );
  }
  switchTab(activeKey) {
    this.setState({
      activeKey,
    });
    this.props.onSwitchTab(activeKey);
  }
  render() {
    const { title } = this.props;
    return (
      <div className="panel">
        <div className="panel-heading">
          <div className="panel-control">{this.getTabNav()}</div>
          <h3 className="panel-title">{title}</h3>
        </div>
        <div className="panel-body">{this.getTabBody()}</div>
      </div>
    );
  }
}

export default PanelTabs;

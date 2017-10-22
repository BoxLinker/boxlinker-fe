import React from 'react';
/* eslint-disable */

import s from './index.pcss';
import AppForm from './AppForm';
import VolumeForm from './VolumeForm';

const tabs = [
  { text: '应用', tabIndex: '0' },
  { text: '数据卷', tabIndex: '1' },
  { text: '镜像', tabIndex: '2' },
];

class Body extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tabIndex: '0',
    };
  }
  onSwitchTab = ({ target: { dataset: { index } } }) => {
    this.setState({
      tabIndex: index,
    });
  };
  getTabItem({ text, tabIndex }, activeIndex) {
    return (
      <a
        key={tabIndex}
        href="javascript:void(0)"
        data-index={tabIndex}
        onClick={this.onSwitchTab}
        className={`list-group-item ${activeIndex === tabIndex
          ? 'active'
          : ''}`}
      >
        {text}
      </a>
    );
  }
  getTab() {
    const { tabIndex } = this.state;
    return (
      <div className="col-sx-6 col-md-3">
        <div className="pad-all">
          <div className="list-group bord-no">
            {tabs.map(tab => this.getTabItem(tab, tabIndex))}
          </div>
        </div>
      </div>
    );
  }
  getBody() {
    const { tabIndex } = this.state;
    return (
      <div className="col-md-9 pos-rel">
        <div className="row">
          <div className="col-lg-12">
            <div className="">
              {tabIndex === '0' ? <AppForm /> : null}
              {tabIndex === '1' ? <VolumeForm /> : null}
            </div>
          </div>
        </div>
      </div>
    );
  }
  render() {
    return (
      <div className={`${s.body} clearfix`}>
        <div className="row">
          {this.getTab()}
          {this.getBody()}
        </div>
      </div>
    );
  }
}

export default Body;

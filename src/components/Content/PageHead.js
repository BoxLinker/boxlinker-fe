import React from 'react';
import BreadCrumb from '../BreadCrumb';

class PageHead extends React.Component {
  render() {
    return (
      <div id="page-head">
        <div id="page-title">
          <h1 className="page-header text-overflow">控制台</h1>
          <div className="searchbox">
            <div className="input-group custom-search-form">
              <input type="text" className="form-control" placeholder="搜索.." />
              <span className="input-group-btn">
                <button className="text-muted" type="button">
                  <i className="demo-pli-magnifi-glass" />
                </button>
              </span>
            </div>
          </div>
        </div>
        <BreadCrumb />
      </div>
    );
  }
}

export default PageHead;

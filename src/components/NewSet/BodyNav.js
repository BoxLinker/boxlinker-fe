import React from 'react';

/* eslint-disable no-script-url */
class BodyNav extends React.Component {
  render() {
    return (
      <div className="col-sx-6 col-md-3">
        <div className="pad-all">
          <div className="list-group bord-no">
            <a href="javascript:void(0)" className="list-group-item active">
              应用
            </a>
            <a href="javascript:void(0)" className="list-group-item">
              数据卷
            </a>
            <a href="javascript:void(0)" className="list-group-item">
              镜像
            </a>
          </div>
        </div>
      </div>
    );
  }
}

export default BodyNav;

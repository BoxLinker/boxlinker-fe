import React from 'react';

import s from './index.pcss';
import BodyNav from './BodyNav';
import BodyContent from './BodyContent';

class Body extends React.Component {
  render() {
    return (
      <div className={`${s.body} clearfix`}>
        <BodyNav />
        <BodyContent />
      </div>
    );
  }
}

export default Body;

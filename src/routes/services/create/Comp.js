import React from 'react';
// import PropTypes from 'prop-types';
import CreateForm from './form';
// import CreateForm from './form-antd';
/* eslint-disable no-script-url */

class Comp extends React.Component {
  static propTypes = {};
  static defaultProps = {};
  componentDidMount() {}
  render() {
    // console.log('>>>', services);
    return (
      <div>
        <CreateForm />
      </div>
    );
  }
}

export default Comp;

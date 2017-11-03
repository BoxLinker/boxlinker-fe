import React from 'react';
import PropTypes from 'prop-types';
import CreateForm from './form';
/* eslint-disable no-script-url */

class Comp extends React.Component {
  static contextTypes = {
    fetch: PropTypes.func,
  };
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

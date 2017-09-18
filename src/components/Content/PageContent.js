import React from 'react';
import PropTypes from 'prop-types';

class PageContent extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
  render() {
    return (
      <div id="page-content">
        {this.props.children}
      </div>
    );
  }
}

export default PageContent;

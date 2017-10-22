import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import s from './index.css';
import PageHead from './PageHead';
import PageContent from './PageContent';

class Content extends React.Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  };
  render() {
    return (
      <div id="content-container" className={s.root}>
        <PageHead />
        <PageContent>
          {this.props.children}
        </PageContent>
      </div>
    );
  }
}

export default withStyles(s)(Content);

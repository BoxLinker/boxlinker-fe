import React from 'react';
import PropTypes from 'prop-types';
import withStyles from 'isomorphic-style-loader/lib/withStyles';
import { Grid } from 'boxlinker-ui'; // eslint-disable-line
import LogView from 'components/Log';
import s from './index.css'; // eslint-disable-line
/* eslint-disable no-script-url */

class Comp extends React.Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    loadServiceDetail: PropTypes.func.isRequired,
    loadServicePodLog: PropTypes.func.isRequired,
  };
  static defaultProps = {};
  componentDidMount() {
    this.props.loadServiceDetail(this.props.name);
    this.props.loadServicePodLog(
      'e6db864935594c15847325e074f761431cf1884a1084711e9d03d76a1dc9406d',
      this.moreLog,
    );
  }
  moreLog = text => {
    try {
      const value = text.substring(
        text.indexOf('{'),
        text.lastIndexOf('}') + 1,
      );

      const json = JSON.parse(value);
      if (json && json.hits && Array.isArray(json.hits.hits)) {
        const lines = json.hits.hits.map(hit => ({
          // id: hit._id, //eslint-disable-line
          value: hit._source.log, //eslint-disable-line
          ts: hit._source['@timestamp'], //eslint-disable-line
        }));
        this.logRef.addLines(lines);
      }
    } catch (err) {
      console.error('parse log error: ', text);
    }
  };
  render() {
    return (
      <div>
        <div>{this.props.name}</div>
        <LogView
          ref={ref => {
            this.logRef = ref;
          }}
        />
      </div>
    );
  }
}

export default withStyles(s)(Comp);

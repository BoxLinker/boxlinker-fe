import React from 'react';
import PropTypes from 'prop-types';
import { API } from '../../../const';
import bfetch from '../../../bfetch';
import InfoPane from './InfoPane';
import InfoLog from './InfoLog';
import './info.css';

class Comp extends React.Component {
  static displayName = 'CICDBuildingInfo';
  static propTypes = {
    refreshAble: PropTypes.bool,
  };
  static defaultProps = {
    refreshAble: false,
  };
  state = {
    loading: true,
    buildData: null,
    procsData: null,
  };
  componentDidMount() {
    const { repoData, buildData } = this.props;
    this.fetch(repoData, buildData);
  }
  componentWillReceiveProps(nextProps) {
    if (!this.props.refreshAble) {
      return;
    }
    if ('buildData' in nextProps && 'repoData' in nextProps) {
      const { repoData, buildData } = nextProps;
      this.fetch(repoData, buildData);
    }
  }
  async fetch(repoData, buildData) {
    // const { repoData, buildData } = this.props;
    if (!repoData) {
      return;
    }
    const { scm, owner, name, last_build } = repoData;
    try {
      const res = await bfetch(
        API.CICD.GET_BUILD(
          scm,
          owner,
          name,
          buildData ? buildData.number : last_build,
        ),
      );
      this.setState({ buildData: res.results, loading: false });
    } catch (e) {
      console.error(e);
    }
  }
  render() {
    const { buildData, loading } = this.state;
    if (loading) {
      return <p>加载中...</p>;
    }
    if (!buildData) {
      return <p>暂无数据</p>;
    }
    return (
      <div>
        <InfoPane repoData={this.props.repoData} buildData={buildData} />
        <InfoLog repoData={this.props.repoData} buildData={buildData} />
      </div>
    );
  }
}

export default Comp;

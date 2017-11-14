import { connect } from 'react-redux';
import { getServiceDetail, getServicePodLog } from 'actions';
import Comp from './Comp';

const mapStateToProps = state => ({
  data: state.serviceDetail,
});

const mapDispatchToProps = dispatch => ({
  loadServiceDetail: pagination => {
    dispatch(getServiceDetail(pagination));
  },
  loadServicePodLog: (containerID, callback) => {
    getServicePodLog(containerID, callback);
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);

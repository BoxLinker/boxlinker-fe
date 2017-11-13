import { connect } from 'react-redux';
import { getServiceDetail } from 'actions';
import Comp from './Comp';

const mapStateToProps = state => ({
  data: state.serviceDetail,
});

const mapDispatchToProps = dispatch => ({
  loadServiceDetail: pagination => {
    dispatch(getServiceDetail(pagination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);

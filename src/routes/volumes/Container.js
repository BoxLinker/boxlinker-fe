import { connect } from 'react-redux';
import Comp from './Comp';
import { getVolumes } from '../../actions/volumes';

const mapStateToProps = state => ({
  volumes: state.volumes,
});

const mapDispatchToProps = dispatch => ({
  loadPage: pagination => {
    dispatch(getVolumes(pagination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);

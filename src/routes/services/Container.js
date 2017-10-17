import { connect } from 'react-redux';
import Comp from './Comp';
import { getServices } from '../../actions';

const mapStateToProps = state => ({
  services: state.services,
});

const mapDispatchToProps = dispatch => ({
  loadServices: (fetch, pagination) => {
    dispatch(getServices(fetch, pagination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);

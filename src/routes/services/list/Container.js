import { connect } from 'react-redux';
import { getServices } from 'actions';
import Comp from './Comp';

const mapStateToProps = state => ({
  services: state.services,
});

const mapDispatchToProps = dispatch => ({
  loadServices: (fetch, pagination) => {
    dispatch(getServices(fetch, pagination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);

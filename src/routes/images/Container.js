import { connect } from 'react-redux';
import { getImages } from 'actions/image';
import Comp from './Comp';

const mapStateToProps = state => ({
  images: state.images,
});

const mapDispatchToProps = dispatch => ({
  loadPage: pagination => {
    dispatch(getImages(pagination));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(Comp);

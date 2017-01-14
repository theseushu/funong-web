import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import 'react-photoswipe/lib/photoswipe.css';
import { PhotoSwipe } from 'react-photoswipe';
import { actions, selector } from './ducks';

const fullScreenGallery = ({ images = [], index, open, close }) => {
  const items = images.map((image) => ({
    src: image.src,
    w: image.width,
    h: image.height,
  }));

  const options = {
    // http://photoswipe.com/documentation/options.html
    index,
  };
  return <PhotoSwipe isOpen={open} items={items} options={options} onClose={close} />;
};

fullScreenGallery.propTypes = {
  images: PropTypes.array,
  index: PropTypes.number,
  open: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired,
};

export default connect(
  (state) => selector(state),
  (dispatch) => bindActionCreators({ close: actions.closeGallery }, dispatch),
)(fullScreenGallery);

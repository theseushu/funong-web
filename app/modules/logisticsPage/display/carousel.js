import React, { PropTypes } from 'react';
import ImageGallery from 'react-image-gallery';
import injectSheet from 'react-jss';
import 'react-image-gallery/styles/css/image-gallery.css';
import { colors } from '../../common/styles';

const Arrow = () => null;

const Carousel = ({ images, width, height, sheet: { classes } }) => {
  if (images.length === 0) {
    return null;
  }
  return (
    <div className={classes.wrapper}>
      <ImageGallery
        items={images}
        slideInterval={2000}
        infinite={false}
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={false}
        slideOnThumbnailHover
        onImageLoad={this.handleImageLoad}
      />
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.shape({
      original: PropTypes.string.isRequired,
      thumbnail: PropTypes.string.isRequired,
    })
  ).isRequired,
  sheet: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
};

export default injectSheet({
  wrapper: {
    width: '100%',
    '& .image-gallery-thumbnail': {
      width: 50,
      height: 50,
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    '& .image-gallery-slides': {
      border: `solid 1px ${colors.colorLightGrey}`,
    },
    '& .image-gallery-thumbnail img': {
      maxWidth: 50,
      maxHeight: 50,
    },
    '& .image-gallery-image': {
      width: '100%',
      height: 300,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
})(Carousel);

import React, { PropTypes } from 'react';
import ImageGallery from 'react-image-gallery';
import injectSheet from 'react-jss';
import 'react-image-gallery/styles/css/image-gallery.css';
import { colors } from 'modules/common/styles';

const Carousel = ({ images, sheet: { classes } }) => {
  if (images.length === 0) {
    return null;
  }
  return (
    <div className={classes.wrapper}>
      <ImageGallery
        items={images.map((image) => ({ ...image, originalClass: classes.image }))}
        slideInterval={2000}
        infinite={false}
        showNav={false}
        showFullscreenButton={false}
        showPlayButton={false}
        showBullets={false}
        slideOnThumbnailHover={false}
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
      borderBottom: `solid 1px ${colors.colorLightGrey}`,
    },
    '& .image-gallery-thumbnail img': {
      maxWidth: 50,
      maxHeight: 50,
    },
    '& .image-gallery-image': {
      width: '100%',
      height: 'auto',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  image: {
    width: '100%',
    paddingTop: '100%',
    '& > .image-gallery-image': {
      width: '100%',
      height: '100%',
      position: 'absolute',
      top: 0,
      left: 0,
    },
  },
})(Carousel);

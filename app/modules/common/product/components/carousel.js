import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ImageGallery from 'react-image-gallery';
import injectSheet from 'react-jss';
import 'react-image-gallery/styles/css/image-gallery.css';
import { actions } from 'modules/fullScreenGallery/ducks';
import { colors } from 'modules/common/styles';

const openGalleryAction = actions.openGallery;

const Carousel = ({ images, sheet: { classes }, openGallery }) => {
  if (images.length === 0) {
    return null;
  }
  return (
    <div className={classes.wrapper}>
      <ImageGallery
        items={images.map((image) => ({ original: image.thumbnail_600_600, thumbnail: image.thumbnail_80_80, originalClass: classes.image }))}
        slideInterval={2000}
        infinite={false}
        showNav={false}
        showPlayButton={false}
        showFullscreenButton={false}
        showBullets={false}
        slideOnThumbnailHover={false}
        onImageLoad={this.handleImageLoad}
        onClick={() => {
          if (images.length > 0) {
            openGallery(images.map((image) => ({ src: image.url, width: image.metaData.width, height: image.metaData.height })));
          }
        }}
      />
    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.array.isRequired,
  sheet: PropTypes.object.isRequired,
  openGallery: PropTypes.func.isRequired,
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
})(connect(
  null,
  (dispatch) => bindActionCreators({ openGallery: openGalleryAction }, dispatch),
)(Carousel));

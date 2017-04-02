import React, { PropTypes } from 'react';
import Link from 'react-router/lib/Link';
import injectSheet from 'react-jss';
import ImageGallery from 'react-image-gallery';

const Ads = ({ classes }) => {
  const images = [
    {
      original: 'http://lorempixel.com/1000/600/nature/1/',
      originalClass: classes.image,
      link: '/supplies?keyword=苹果',
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/2/',
      originalClass: classes.image,
      link: '/supplies?keyword=苹果',
    },
    {
      original: 'http://lorempixel.com/1000/600/nature/3/',
      originalClass: classes.image,
      link: '/supplies?keyword=苹果',
    },
  ];

  return (
    <ImageGallery
      items={images}
      slideInterval={2000}
      showNav={false}
      showThumbnails={false}
      showFullscreenButton={false}
      showPlayButton={false}
      showBullets
      renderItem={(item) => (
        <div className="image-gallery-image">
          <Link to={item.link}>
            <img
              src={item.original}
              alt={item.originalAlt}
              srcSet={item.srcSet}
              sizes={item.sizes}
              onLoad={null}
            />
          </Link>
          {
              item.description &&
              <span className="image-gallery-description">
                  {item.description}
                </span>
            }
        </div>
        )
      }
    />
  );
};

Ads.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  image: {
    width: '100%',
    height: 250,
  },
})(Ads);

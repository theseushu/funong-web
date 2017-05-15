import React, { Component, PropTypes } from 'react';
import _findIndex from 'lodash/findIndex';
import Link from 'react-router/lib/Link';
import injectSheet from 'react-jss';
import ImageGallery from 'react-image-gallery';
import Media from 'react-media';
import { breakpoints } from 'modules/common/styles';
import ads1 from './assets/ads_1.jpg';
import ads2 from './assets/ads_2.jpg';
import ads3 from './assets/ads_3.jpg';
import ads4 from './assets/ads_4.jpg';
import ads1Mobile from './assets/ads_mobile_1.jpg';
import ads2Mobile from './assets/ads_mobile_2.jpg';
import ads3Mobile from './assets/ads_mobile_3.jpg';
import ads4Mobile from './assets/ads_mobile_4.jpg';

class Ads extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
  }
  state = { currentIndex: 0, loaded: [], background: null }
  componentDidMount() {
    System.import('./bgColorThief');
  }
  changeBackground = async () => {
    const bgColorThief = await System.import('./bgColorThief');
    const { currentIndex, loaded } = this.state;
    if (loaded[currentIndex]) {
      const rgb = bgColorThief.getBackGroundColor(loaded[currentIndex]);
      this.setState({ background: `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.3)` });
    }
  }
  render() {
    const { classes } = this.props;
    const images = [
      {
        original: ads1,
        mobile: ads1Mobile,
        link: '/supplies?keyword=苹果',
      },
      {
        original: ads2,
        mobile: ads2Mobile,
        link: '/supplies?keyword=苹果',
      },
      {
        original: ads3,
        mobile: ads3Mobile,
        link: '/supplies?keyword=苹果',
      },
      {
        original: ads4,
        mobile: ads4Mobile,
        link: '/supplies?keyword=苹果',
      },
    ];

    return (
      <Media query="(min-width: 1190px)">
        {
          (bigScreen) => {
            const imagesToShow = images.map((i) => ({
              original: bigScreen ? i.original : i.mobile,
              originalClass: classes.image,
              link: i.link,
            }));
            return (<div className={classes.wrapper} style={{ background: this.state.background }}>
              <ImageGallery
                items={imagesToShow}
                slideInterval={2000}
                showNav={false}
                showThumbnails={false}
                showFullscreenButton={false}
                showPlayButton={false}
                showBullets
                infinite
                onSlide={(currentIndex) => {
                  this.setState({ currentIndex }, this.changeBackground);
                }}
                renderItem={(item) => (
                  <Link to={item.link}>
                    <img
                      alt={item.originalAlt}
                      src={item.original}
                      srcSet={item.srcSet}
                      sizes={item.sizes}
                      onLoad={(e) => {
                        const index = _findIndex(images, (image) => image.original === item.original);
                        const loaded = [...this.state.loaded];
                        loaded[index] = e.target;
                        this.setState({ loaded }, this.changeBackground);
                      }}
                    />
                  </Link>
                )
                }
              />
            </div>);
          }
        }
      </Media>
    );
  }
}

export default injectSheet({
  wrapper: {
    width: '100%',
    '& > *': {
      maxWidth: 750,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
    '@media (min-width: 1190px)': {
      '& > *': {
        maxWidth: 1190,
      },
    },
  },
  image: {
    height: 430,
    maxWidth: 1190,
    [breakpoints.mediaDestkopBelow]: {
      height: '95vw',
    },
  },
})(Ads);

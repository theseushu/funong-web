import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardMenu, CardText, CardActions, CardMedia } from 'react-mdl/lib/Card';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import Button from 'react-mdl/lib/Button';
import styles, { colors } from 'modules/common/styles';
import Share from 'modules/common/share';
import Carousel from '../components/carousel';
import AddToCartButton from '../components/addToCartButton';
import CategoryAndSpecies from './categoryAndSpecies';
import Specs from './specs';
import UpdateTimeAndLocation from './updateTimeAndLocation';

class ProductDetails extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    location: PropTypes.object,
    classes: PropTypes.object.isRequired,
  }
  state = { specIndex: 0}
  render() {
    const { product: { name, images, category, species, specs, location: { address, lnglat }, desc, updatedAt }, location, classes } = this.props;
    const { specIndex } = this.state;
    return (
      <Card shadow={2} className={styles.w100}>
        <CardTitle>{name}</CardTitle>
        <CardMenu>
          <Share />
        </CardMenu>
        <CardMedia className={classes.images}>
          <Carousel
            images={images.map((image) => ({ original: image.thumbnail_600_600, thumbnail: image.thumbnail_80_80 }))}
          />
        </CardMedia>
        <div className={classes.content}>
          <CategoryAndSpecies category={category} species={species} />
          <Specs specIndex={specIndex} specs={specs} onClick={(i) => this.setState({ specIndex: i })} />
          <UpdateTimeAndLocation location={{ address, lnglat }} currentLocation={location} updatedAt={updatedAt} />
        </div>
        <CardActions border className={classes.buttons}>
          <Button raised accent ripple>在线联系</Button>
          <AddToCartButton supplyProduct={this.props.product} specIndex={specIndex} quantity={specs[specIndex].minimum}>加入购物车</AddToCartButton>
        </CardActions>
      </Card>
    );
  }
}

export default injectSheet({
  content: {
    padding: 16,
    color: colors.colorSubTitle,
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
  tabs: {
    display: 'flex',
    '& > div': {
      width: 'auto',
    },
  },
  images: {
    background: 'transparent',
  },
})(ProductDetails);

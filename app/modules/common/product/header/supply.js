import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { Card, CardMenu, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import styles, { breakpoints, colors } from 'modules/common/styles';
import Share from 'modules/common/share';
import Carousel from '../components/carousel';
import AddToCartButton from '../components/addToCartButton';
import CategoryAndSpecies from './content/categoryAndSpecies';
import Specs from './content/specs';
import UpdateTimeAndLocation from './content/updateTimeAndLocation';
import Badges from './content/badges';

class ProductDetails extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    location: PropTypes.object,
    classes: PropTypes.object.isRequired,
  }
  state = { specIndex: 0 }
  render() {
    const { product: { name, images, category, species, specs, location: { address, lnglat }, updatedAt }, location, classes } = this.props;
    const { specIndex } = this.state;
    return (
      <Grid noSpacing className={styles.w100}>
        <Cell col={4} tablet={8} phone={4} className={classes.carouselCell}>
          <Card shadow={2} className={classes.carouselCard}>
            <Carousel images={images} />
          </Card>
        </Cell>
        <Cell col={8} tablet={8} phone={4}>
          <Card shadow={2} className={classes.card}>
            <CardMenu>
              <Share />
            </CardMenu>
            <div className={classes.content}>
              <h5>{name}</h5>
              <CategoryAndSpecies category={category} species={species} />
              <UpdateTimeAndLocation location={{ address, lnglat }} currentLocation={location} updatedAt={updatedAt} />
              <Specs specIndex={specIndex} specs={specs} onClick={(i) => this.setState({ specIndex: i })} />
              <Badges />
            </div>
            <CardActions border className={classes.buttons}>
              <Button raised accent ripple>在线联系</Button>
              <AddToCartButton type="supply" product={this.props.product} specIndex={specIndex} quantity={specs[specIndex].minimum}>加入购物车</AddToCartButton>
            </CardActions>
          </Card>
        </Cell>
      </Grid>
    );
  }
}

export default injectSheet({
  card: {
    width: '100%',
  },
  carouselCell: {
    paddingRight: 24,
    [breakpoints.mediaDestkopBelow]: {
      paddingRight: 0,
      order: 2,
    },
  },
  carouselCard: {
    width: '100%',
    marginBottom: 16,
  },
  content: {
    padding: 16,
    color: colors.colorSubTitle,
    flex: 1,
    '& > h5': {
      marginTop: 0,
      marginBottom: 24,
      color: colors.colorText,
      [breakpoints.mediaDestkopBelow]: {
        marginBottom: 16,
      },
    },
  },
  buttons: {
    display: 'flex',
    justifyContent: 'space-around',
  },
})(ProductDetails);

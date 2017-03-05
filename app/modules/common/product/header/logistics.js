import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { Card, CardMenu, CardActions } from 'react-mdl/lib/Card';
import Button from 'react-mdl/lib/Button';
import styles, { breakpoints, colors } from 'modules/common/styles';
import Share from 'modules/common/share';
import Carousel from '../components/carousel';
import UpdateTimeAndLocation from './content/updateTimeAndLocation';
import Badges from './content/badges';
import CapacityAndCount from './content/capacityAndCount';
import Range from './content/range';

class ProductDetails extends Component {
  static propTypes = {
    product: PropTypes.object.isRequired,
    location: PropTypes.object,
    classes: PropTypes.object.isRequired,
  }
  state = { specIndex: 0 }
  render() {
    const { product: { name, images, capacity, count, range, location: { address, lnglat }, updatedAt }, location, classes } = this.props;
    return (
      <Grid noSpacing className={styles.w100}>
        <Cell col={4} tablet={8} phone={4} className={classes.carouselCell}>
          <Card shadow={2} className={classes.carouselCard}>
            <Carousel
              images={images.map((image) => ({ original: image.thumbnail_600_600, thumbnail: image.thumbnail_80_80 }))}
            />
          </Card>
        </Cell>
        <Cell col={8} tablet={8} phone={4}>
          <Card shadow={2} className={classes.card}>
            <CardMenu>
              <Share />
            </CardMenu>
            <div className={classes.content}>
              <h5>{name}</h5>
              <UpdateTimeAndLocation locationTile="常驻地" location={{ address, lnglat }} currentLocation={location} updatedAt={updatedAt} />
              <CapacityAndCount capacity={capacity} count={count} />
              <Range range={range} />
              <Badges />
            </div>
            <CardActions border className={classes.buttons}>
              <Button raised accent ripple>在线联系</Button>
            </CardActions>
          </Card>
        </Cell>
      </Grid>
    );
  }
}
/*
<p style={{ width: '100%', display: 'flex', justifyContent: 'space-between' }}>
  <span>最大运量：{product.capacity}吨</span><span>车辆数：{product.maxNumber}</span>
</p>
<p>
服务区域：
{ product.range.map((province, i) => <span key={i}> {province.title}</span>) }
</p>
*/
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

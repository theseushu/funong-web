import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { Card, CardMenu, CardActions } from 'react-mdl/lib/Card';
import { selectors } from 'api/map';
import MediaLeftUserCard from 'modules/common/user/mediaLeftCard';
import UserCard from 'modules/common/user/card';
import styles, { breakpoints, colors } from 'modules/common/styles';
import { MainRight } from 'modules/common/layout/content';
import ChatButton from 'modules/common/user/chatButton';
import Share from 'modules/common/share';
import DescCard from '../../display/descCard';
import Carousel from '../../display/carousel';
import AddToCartButton from '../../display/addToCartButton';
import UpdateTimeAndLocation from '../../display/updateTimeAndLocation';
import CapacityAndCount from '../../display/capacityAndCount';
import Badges from '../../display/badges';
import Range from '../../display/range';

// <UserCard user={product.owner} />
const Display = ({ type, entry, location, classes }) => {
  const { name, images, capacity, count, range, location: { address, lnglat }, owner, updatedAt, desc } = entry;
  return (
    <div className={styles.w100}>
      <div>
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
                <UpdateTimeAndLocation locationTile="常驻地" location={{ address, lnglat }} currentLocation={location} updatedAt={updatedAt} />
                <CapacityAndCount capacity={capacity} count={count} />
                <Range range={range} />
                <Badges />
              </div>
              <CardActions border className={classes.buttons}>
                <ChatButton raised accent ripple user={owner}>在线联系</ChatButton>
                <AddToCartButton type={type} entry={entry}>加入购物车</AddToCartButton>
              </CardActions>
            </Card>
          </Cell>
        </Grid>
        <MainRight
          main={[
            <DescCard key={0} desc={desc} />,
            // <Comments key={1} supplyProduct={entry} className={styles.mt24} />,
          ]}
          right={<UserCard user={owner} />}
        />
      </div>
      <MediaLeftUserCard className={classes.mobileUser} user={owner} hideActions={false} />,
    </div>
  );
};

Display.propTypes = {
  classes: PropTypes.object.isRequired,
  entry: PropTypes.object.isRequired,
  location: PropTypes.object,
  type: PropTypes.string.isRequired,
};

export default connect(
  (state) => ({ location: selectors.getCurrentLocation(state).location })
)(injectSheet({
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
  mobileUser: {
    marginTop: 16,
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
})(Display));

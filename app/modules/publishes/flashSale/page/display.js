import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { selectors } from 'api/map';
import styles, { breakpoints, colors } from 'modules/common/styles';
import { MainRight } from 'modules/common/layout/content';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { Card, CardMenu, CardActions } from 'react-mdl/lib/Card';
import ShopCard from 'modules/common/shop/card';
import Share from 'modules/common/share';
import ChatButton from 'modules/common/user/chatButton';
import { formatStartAndEndTime, formatDateTime } from 'funong-common/lib/utils/displayUtils';
import DescCard from '../../display/descCard';
import Carousel from '../../display/carousel';
import AddToCartButton from '../../display/addToCartButton';
import CategoryAndSpecies from '../../display/categoryAndSpecies';
import Specs from '../../display/specs';
import UpdateTimeAndLocation from '../../display/updateTimeAndLocation';
import Badges from '../../display/badges';

class Display extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired,
    entry: PropTypes.object.isRequired,
    location: PropTypes.object,
  }
  state = { specIndex: 0 }
  render() {
    const { type, entry: { name, images, category, species, specs, shop: { owner }, desc, startAt, endAt, updatedAt }, location, classes } = this.props;
    const { specIndex } = this.state;
    return ( // eslint-disable-line
      <div className={styles.w100}>
        <Grid noSpacing className={styles.w100}>
          <Cell col={4} tablet={8} phone={4} className={classes.carouselCell}>
            <Card shadow={2} className={classes.carouselCard}>
              <Carousel images={images} />
            </Card>
          </Cell>
          <Cell col={8} tablet={8} phone={4}>
            <Card shadow={2} className={classes.card}>
              <CardMenu>
                <Share type={type} />
              </CardMenu>
              <div className={classes.content}>
                <h5>{name}</h5>
                <h5 className={styles.colorPrice}>{formatStartAndEndTime(startAt, endAt)} <small>{formatDateTime(startAt)} -- {formatDateTime(endAt)}</small></h5>
                <CategoryAndSpecies category={category} species={species} />
                <UpdateTimeAndLocation location={null} currentLocation={location} updatedAt={updatedAt} />
                <Specs specIndex={specIndex} specs={specs} onClick={(i) => this.setState({ specIndex: i })} />
                <Badges />
              </div>
              <CardActions border className={classes.buttons}>
                <ChatButton raised accent ripple user={owner}>在线联系</ChatButton>
                <AddToCartButton type={type} entry={this.props.entry} specIndex={specIndex} quantity={1}>加入购物车</AddToCartButton>
              </CardActions>
            </Card>
          </Cell>
        </Grid>
        <MainRight
          main={[
            <DescCard key={0} desc={desc} />,
          ]}
          right={<ShopCard shop={this.props.entry.shop} />}
        />
      </div>
    );
  }
}

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

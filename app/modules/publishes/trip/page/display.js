import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { Card, CardMenu, CardActions } from 'react-mdl/lib/Card';
import { selectors } from 'api/map';
import MediaLeftUserCard from 'modules/common/user/mediaLeftCard';
import styles, { breakpoints, colors } from 'modules/common/styles';
import UserCard from 'modules/common/user/card';
import { MainRight } from 'modules/common/layout/content';
import ChatButton from 'modules/common/user/chatButton';
import Share from 'modules/common/share';
import DescCard from '../../display/descCard';
import Carousel from '../../display/carousel';
import UpdateTimeAndLocation from '../../display/updateTimeAndLocation';
import Specs from '../../display/specs';
import Badges from '../../display/badges';

class Display extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    type: PropTypes.string.isRequired, // eslint-disable-line
    entry: PropTypes.object.isRequired,
    location: PropTypes.object,
  }
  state = { specIndex: 0 }
  render() {
    const { entry: { name, images, specs, location: { address, lnglat }, owner, desc, updatedAt }, location, classes } = this.props;
    const { specIndex } = this.state;
    return ( // eslint-disable-line
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
                  <UpdateTimeAndLocation location={{ address, lnglat }} currentLocation={location} updatedAt={updatedAt} />
                  <Specs specIndex={specIndex} specs={specs} onClick={(i) => this.setState({ specIndex: i })} />
                  <Badges />
                </div>
                <CardActions border className={classes.buttons}>
                  <ChatButton raised accent ripple user={owner}>在线联系</ChatButton>
                </CardActions>
              </Card>
            </Cell>
          </Grid>
          <MainRight
            main={[
              <DescCard key={0} desc={desc} />,
            ]}
            right={<UserCard user={owner} />}
          />
        </div>
        <MediaLeftUserCard className={classes.mobileUser} user={owner} hideActions={false} />,
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

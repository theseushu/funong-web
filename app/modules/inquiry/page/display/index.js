import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import styles, { breakpoints } from 'modules/common/styles';
import { MainRight } from 'modules/common/layout/content';
import UserCard from 'modules/common/user/card';
import MediaLeftUserCard from 'modules/common/user/mediaLeftCard';
import DescCard from 'modules/common/desc/card';
import { actions } from '../ducks';
import Info from './info';
import BidButton from './bidButton';
import MyBids from './myBids';
import Bids from './bids';

const Display = ({ inquiry, location, refresh, classes }) => (
  <MainRight
    main={
      <div>
        <div className={classes.header}>
          <div className={classes.info}>
            <Card shadow={2}>
              <CardTitle>{`[采购]${inquiry.name}`}</CardTitle>
              <CardText className={styles.w100}>
                <Info inquiry={inquiry} />
              </CardText>
              <CardActions>
                <div className={classes.actions}>
                  <BidButton inquiry={inquiry} location={location} onCreated={refresh} />
                </div>
              </CardActions>
            </Card>
            <MediaLeftUserCard className={`${styles.mt24} ${classes.mobileUser}`} user={inquiry.owner} />
            <MyBids inquiry={inquiry} onWithdrawn={refresh} />
            <Bids inquiry={inquiry} />
            <DescCard desc={inquiry.desc} />
          </div>
          <div className={classes.mobileUser}>
          </div>
        </div>
      </div>
    }
    right={<UserCard user={inquiry.owner} />}
  />
);
Display.propTypes = {
  inquiry: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  refresh: PropTypes.func.isRequired,
};

const pageBids = actions.pageBids;
const pageMyBids = actions.pageMyBids;

export default injectSheet({
  header: {
  },
  info: {
    '& > div': {
      width: '100%',
    },
  },
  mobileUser: {
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
  actions: {
    width: '100%',
    display: 'flex',
  },
  bid: {
    width: 100,
  },
})(connect(
  null,
  (dispatch, { inquiry }) => {
    const bindActions = bindActionCreators({ pageBids, pageMyBids }, dispatch);
    return {
      refresh: () => {
        bindActions.pageBids({ inquiry, page: 1, pageSize: 10 });
        bindActions.pageMyBids({ inquiry, mine: true, page: 1, pageSize: 10 });
      },
    };
  },
)(Display));

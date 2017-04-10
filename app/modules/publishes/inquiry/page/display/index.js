import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Card, CardTitle, CardText, CardActions } from 'react-mdl/lib/Card';
import MediaLeftUserCard from 'modules/common/user/mediaLeftCard';
import styles, { breakpoints } from 'modules/common/styles';
import UserCard from 'modules/common/user/card';
import { MainRight } from 'modules/common/layout/content';
import DescCard from 'modules/common/desc/card';
import { actions } from '../ducks';
import Info from './info';
import BidButton from './bidButton';
import MyBids from './myBids';
import Bids from './bids';
// import Comments from 'modules/common/comments';

const Display = ({ entry, location, refresh, classes }) => (
  <div className={styles.w100}>
    <MainRight
      main={
        <div className={classes.header}>
          <div className={classes.info}>
            <Card shadow={2}>
              <CardTitle>{`[采购]${entry.name}`}</CardTitle>
              <CardText className={styles.w100}>
                <Info inquiry={entry} />
              </CardText>
              <CardActions>
                <div className={classes.actions}>
                  <BidButton inquiry={entry} location={location} onCreated={refresh} />
                </div>
              </CardActions>
            </Card>
            <MediaLeftUserCard className={`${styles.mt24} ${classes.mobileUser}`} user={entry.owner} />
            <MyBids inquiry={entry} onWithdrawn={refresh} />
            <Bids inquiry={entry} />
            <DescCard desc={entry.desc} />
          </div>
        </div>
        }
      right={<UserCard user={entry.owner} />}
    />
  </div>
  );
Display.propTypes = {
  entry: PropTypes.object.isRequired,
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

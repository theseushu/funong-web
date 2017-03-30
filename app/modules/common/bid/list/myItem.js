import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import IconButton from 'react-mdl/lib/IconButton';
import Menu from 'react-mdl/lib/Menu';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import styles, { breakpoints } from 'modules/common/styles';
import { Avatar } from 'modules/common/user';
import Text from 'modules/common/text';
import { humanizeTime } from 'utils/displayUtils';
import EditButton from '../editButton';
import WithdrawButton from '../withdrawButton';

const BidItem = ({ classes, bid, onWithdrawn }) => (
  <ListItem threeLine>
    <ListItemContent
      avatar={<div><Avatar user={bid.inquiry.owner} /></div>}
      subtitle={
        <div className={classes.subTitle}>
          <Grid noSpacing>
            <Cell col={6} tablet={4} phone={2}>
              <Text className={styles.colorPrice}>{bid.price}</Text>
            </Cell>
            <Cell col={6} tablet={4} phone={2}>
              <Text className={styles.colorPrice}>{bid.quantity}</Text>
            </Cell>
          </Grid>
          <div className={classes.thirdTitle}>
            {bid.product && <Link className={`${styles.colorAccent} ${classes.product}`} to={`/supply/${bid.product.objectId}`}><Text title={false}>{bid.product.name}</Text></Link>}
            {!bid.product && <span className={classes.product}>无</span>}
            <span>{humanizeTime(bid.updatedAt)}</span>
          </div>
        </div>
        }
    >
      <div className={classes.title}>
        <Grid noSpacing>
          <Cell col={12} tablet={8} phone={4}>
            <Link className={styles.colorAccent} to={`/inquiry/${bid.inquiry.objectId}`}><Text
              title={false}
            >{bid.inquiry.name}</Text></Link>
          </Cell>
        </Grid>
      </div>
    </ListItemContent>
    <ListItemAction className={classes.actions}>
      <div className={classes.buttonsDesktop}>
        <EditButton bid={bid} />
        <WithdrawButton bid={bid} onWithdrawn={onWithdrawn} />
      </div>
      <div className={classes.buttonsTouch}>
        <IconButton name="more_vert" id={`bid_${bid.objectId}_menu`} />
        <Menu target={`bid_${bid.objectId}_menu`} align="right">
          <EditButton bid={bid} />
          <WithdrawButton bid={bid} onWithdrawn={onWithdrawn} />
        </Menu>
      </div>
    </ListItemAction>
  </ListItem>
  );

BidItem.propTypes = {
  classes: PropTypes.object.isRequired,
  bid: PropTypes.object.isRequired,
  onWithdrawn: PropTypes.func,
};

export default injectSheet({
  title: { display: 'inline-block', width: 'calc(100% - 56px)' },
  subTitle: {
  },
  secondTitle: {
    display: 'flex',
  },
  name: {
    minWidth: '3em',
  },
  product: {
    flex: 1,
  },
  thirdTitle: {
    display: 'flex',
  },
  buttonsDesktop: {
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  buttonsTouch: {
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
  },
})(BidItem);

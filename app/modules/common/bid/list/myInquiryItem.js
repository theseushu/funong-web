import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import IconButton from 'react-mdl/lib/IconButton';
import Menu from 'react-mdl/lib/Menu';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { productTypes } from 'appConstants';
import styles, { breakpoints } from 'modules/common/styles';
import { Thumbnail } from 'modules/common/product';
import Text from 'modules/common/text';
import { humanizeTime } from 'utils/displayUtils';
import EditButton from '../editButton';
import WithdrawButton from '../withdrawButton';

const BidItem = ({ classes, bid, onWithdrawn }) => (
  <ListItem twoLine>
    <ListItemContent
      avatar={bid.product ? <div>
        <Thumbnail type={productTypes.supply} thumbnail={bid.product.thumbnail} />
      </div> : null}
      subtitle={
        <div className={classes.subTitle}>
          <Text className={classes.message}>{bid.message}</Text>
          <span> {humanizeTime(bid.updatedAt)}</span>
          <br />
        </div>
      }
    >
      <div className={classes.title}>
        <Grid noSpacing>
          <Cell col={6} tablet={4} phone={2}>
            <Text className={styles.colorPrice}>{bid.price}</Text>
          </Cell>
          <Cell col={6} tablet={4} phone={2}>
            <Text className={styles.colorPrice}>{bid.quantity}</Text>
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
    display: 'flex',
    width: 'calc(100% - 56px)',
  },
  message: {
    flex: 1,
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

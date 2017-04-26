import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { ListItem, ListItemContent } from 'react-mdl/lib/List';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import { publishTypes } from 'funong-common/lib/appConstants';
import styles from 'modules/common/styles';
import Thumbnail from 'modules/common/publishes/thumbnail';
import Text from 'modules/common/text';
import { humanizeTime } from 'funong-common/lib/utils/displayUtils';

const BidItem = ({ classes, bid }) => (
  <ListItem threeLine>
    <ListItemContent
      avatar={bid.product ? <div>
        <Thumbnail type={publishTypes.supply} thumbnail={bid.product.thumbnail} />
      </div> : null}
      subtitle={
        <div className={classes.subTitle}>
          <div className={classes.secondTitle}>
            {bid.product && <Link className={`${styles.colorAccent} ${classes.product}`} to={`/supply/${bid.product.objectId}`}><Text title={false}>{bid.product.name}</Text></Link>}
            <Text className={classes.name}>{bid.owner.name}</Text>
          </div>
          <div className={classes.thirdTitle}>
            <Text className={classes.message}>{bid.message}</Text>
            <span>{humanizeTime(bid.updatedAt)}</span>
          </div>
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
  </ListItem>
);

BidItem.propTypes = {
  classes: PropTypes.object.isRequired,
  bid: PropTypes.object.isRequired,
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
    marginRight: 16,
  },
  thirdTitle: {
    display: 'flex',
  },
  message: {
    flex: 1,
  },
})(BidItem);

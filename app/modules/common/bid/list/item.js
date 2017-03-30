import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { ListItem } from 'react-mdl/lib/List';
import { Grid, Cell } from 'react-mdl/lib/Grid';
import Link from 'react-router/lib/Link';
import styles, { breakpoints, colors } from 'modules/common/styles';
import Text from 'modules/common/text';
import { humanizeTime } from 'utils/displayUtils';

export const hideName = (name) => {
  if (!name) {
    return '**';
  }
  return `${name[0]}**${name[name.length - 1]}`;
};

const BidItem = ({ classes, bid }) => (
  <ListItem>
    <Grid noSpacing className={classes.subTitle}>
      <Cell col={2} tablet={4} phone={2}>
        <Text>{hideName(bid.owner.name)}</Text>
      </Cell>
      <Cell col={3} tablet={4} phone={2}>
        <Text>{`${bid.quantity}`}</Text>
      </Cell>
      <Cell col={7} tablet={8} phone={4}>
        <div className={classes.product}>
          {bid.product && <Link className={`${styles.colorAccent} ${classes.productName}`} to={`/supply/${bid.product.objectId}`}><Text title={false}>{bid.product.name}</Text></Link>}
          {!bid.product && <span className={classes.productName}>无</span>}
          <small>{humanizeTime(bid.updatedAt)}</small>
        </div>
      </Cell>
    </Grid>
  </ListItem>
);

BidItem.propTypes = {
  classes: PropTypes.object.isRequired,
  bid: PropTypes.object.isRequired,
};

const TitleComponent = ({ classes }) => (
  <Grid noSpacing className={classes.title}>
    <Cell col={2} tablet={4} phone={2}>
      用户
    </Cell>
    <Cell col={3} tablet={4} phone={2}>
      供货量
    </Cell>
    <Cell col={7} tablet={8} phone={4}>
      产品
    </Cell>
  </Grid>
);

TitleComponent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export const Title = injectSheet({
  title: {
    width: '100%',
    padding: '0 16px !important',
    color: colors.colorSubTitle,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
})(TitleComponent);


export default injectSheet({
  subTitle: {
    width: '100%',
    color: colors.colorSubTitle,
  },
  product: {
    display: 'flex',
    width: '100%',
  },
  productName: {
    flex: 1,
  },
})(BidItem);

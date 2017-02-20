import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardActions } from 'react-mdl/lib/Card';
import { formatPrices, formatParams } from 'utils/displayUtils';
import Badge from '../badge';
import styles, { breakpoints, colors } from '../styles';

const ShopProduct = ({ product, actions, classes }) => {
  const paramsStr = formatParams(product.specs);
  return (
    <Card shadow={0} className={`${classes.card} ${styles.defaultTransition}`}>
      <Link to="/me" className={classes.title}>
        <div className={classes.image}>
          <div className="_wrapper" style={{ backgroundImage: `url(${product.thumbnail.thumbnail_300_300})` }}>
          </div>
        </div>
        <div className={`${classes.priceAndName} ${styles.colorPrice}`}>
          <h4>{formatPrices(product.specs)}</h4>
          <p title={product.name}>{product.name}</p>
        </div>
      </Link>
      <div className={classes.content}>
        <div className={classes.specsOwnerAndBadge}>
          <p className={classes.specs} title={paramsStr}>
            {paramsStr}
          </p>
          <div className={classes.ownerAndBadge}>
            <p>
              {product.shop.name}
            </p>
            <div>
              <Badge>大</Badge>
              <Badge>小</Badge>
            </div>
          </div>
        </div>
      </div>
      {(actions && actions.length > 0) &&
        <CardActions className={classes.cardActions} border>
          {actions}
        </CardActions>
      }
    </Card>
  );
};

ShopProduct.propTypes = {
  product: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  actions: PropTypes.array,
};

export default injectSheet({
  card: {
    width: '100%',
    maxWidth: 230,
    minWidth: 0,
    minHeight: 0,
    '&:hover': {
      boxShadow: 'rgba(0, 0, 0, 0.188235) 0px 10px 30px, rgba(0, 0, 0, 0.227451) 0px 6px 10px !important',
    },
    '& p': {
      fontSize: '1rem',
      lineHeight: '1rem',
      marginBottom: 8,
    },
    [breakpoints.mediaTabletBelow]: {
      maxWidth: 1000,
    },
  },
  title: {
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    textDecoration: 'none',
    [breakpoints.mediaTabletBelow]: {
      flexDirection: 'row',
      height: 80,
    },
  },
  image: {
    width: '100%',
    '& > ._wrapper': {
      position: 'relative',
      backgroundSize: 'cover',
      width: '100%',
      paddingTop: '75%',
    },
    [breakpoints.mediaTabletBelow]: {
      width: '60px',
    },
  },
  content: {
    padding: '0 8px 16px',
  },
  priceAndName: {
    width: '100%',
    overflow: 'hidden',
    padding: 8,
    '& > h4': {
      margin: 0,
      color: colors.colorPrice,
    },
    '& > p': {
      margin: 0,
      color: colors.colorText,
    },
    '& > h4, p': {
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'clip',
    },
    [breakpoints.mediaTabletBelow]: {
      flex: 1,
    },
  },
  specsOwnerAndBadge: {
  },
  ownerAndBadge: {
    [breakpoints.mediaTabletBelow]: {
      display: 'flex',
      justifyContent: 'space-between',
    },
  },
  specs: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'clip',
    color: colors.colorSubTitle,
  },
})(ShopProduct);

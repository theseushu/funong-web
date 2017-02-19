import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import { Card, CardActions } from 'react-mdl/lib/Card';
import formatPrices from 'utils/displayUtils';
import Badge from '../badge';
import styles, { breakpoints, colors } from '../styles';

const ShopProduct = ({ product, classes }) => (
  <Card shadow={0} className={`${classes.card} ${styles.defaultTransition}`}>
    <Link to="/me" className={classes.title}>
      <div className={classes.image}>
        <div className="_wrapper" style={{ background: `url(${product.thumbnail.thumbnail_300_300})` }}>
        </div>
      </div>
      <div className={`${classes.priceAndName} ${styles.colorPrice}`}>
        <h4>{formatPrices(product.specs)}</h4>
        <p title={product.name}>{product.name}</p>
      </div>
    </Link>
    <div className={classes.content}>
      <div className={classes.specsOwnerAndBadge}>
        <p className={classes.specs}>
          茵曼 INMAN 格子长袖连衣裙 湛蓝色 XL
        </p>
        <div className={classes.ownerAndBadge}>
          <p>
            呼啸为
          </p>
          <div>
            <Badge>大</Badge>
            <Badge>小</Badge>
          </div>
        </div>
      </div>
    </div>
    <CardActions className={classes.cardActions} border>
      <Button colored>111</Button>
    </CardActions>
  </Card>
);

ShopProduct.propTypes = {
  product: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
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
      width: '100%',
      paddingTop: '133.33%',
      backgroundSize: 'cover',
    },
    [breakpoints.mediaTabletBelow]: {
      width: '60px',
    },
  },
  content: {
    padding: '0 8px 16px',
    '& p': {
      fontSize: '1rem',
      marginBottom: 8,
    },
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
      fontSize: '1rem',
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

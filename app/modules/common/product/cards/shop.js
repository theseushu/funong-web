import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card, CardActions } from 'react-mdl/lib/Card';
import { briefAddress, formatPrices, formatParams, humanizeTime } from 'utils/displayUtils';
import { ImageBadge } from 'modules/common/badge';
import styles, { breakpoints, colors } from 'modules/common/styles';

const ShopProductCard = ({ product, actions, classes }) => {
  const paramsStr = formatParams(product.specs);
  return (
    <Card shadow={2} className={`${classes.card} ${styles.defaultTransition}`}>
      <Link to={`/product/${product.objectId}`} className={classes.title}>
        <div className={classes.image}>
          <div className="_wrapper" style={{ backgroundImage: `url(${product.thumbnail.thumbnail_300_300})` }}>
          </div>
        </div>
        <div className={`${classes.priceAndName} ${styles.colorPrice}`}>
          <h6>{formatPrices(product.specs)}</h6>
          <p title={product.name}>{product.name}</p>
        </div>
      </Link>
      <div className={classes.content}>
        <div className={classes.specsOwnerAndBadge}>
          <p className={classes.specs} title={paramsStr}>
            {paramsStr}
          </p>
          <div className={classes.ownerBadge}>
            <p>
              {product.shop.name}
            </p>
            <div>
              <ImageBadge name="company" tooltip size={'1em'} />
              <ImageBadge name="expert" tooltip size={'1em'} />
              <ImageBadge name="personal" tooltip size={'1em'} />
              <ImageBadge name="assurance" tooltip size={'1em'} />
            </div>
          </div>
          <div className={classes.locationAndUpdateTime}>
            <p>{briefAddress(product.shop.location.address)}</p><p>{humanizeTime(product.updatedAt)}</p>
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

ShopProductCard.propTypes = {
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
      boxShadow: 'rgba(0, 0, 0, 0.247059) 0px 14px 45px, rgba(0, 0, 0, 0.219608) 0px 10px 18px !important',
    },
    '& p': {
      fontSize: 12,
      lineHeight: '16px',
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
      height: 60,
      marginBottom: 8,
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
      '& > ._wrapper': {
        paddingTop: '100%',
      },
    },
  },
  content: {
    padding: '0 8px 16px',
  },
  priceAndName: {
    width: '100%',
    overflow: 'hidden',
    padding: 8,
    '& > h6': {
      margin: 0,
      color: colors.colorPrice,
    },
    '& > p': {
      margin: 0,
      color: colors.colorText,
    },
    '& > h6, p': {
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
  ownerBadge: {
    '& > p': {
      fontSize: 14,
    },
    display: 'flex',
    justifyContent: 'space-between',
  },
  locationAndUpdateTime: {
    display: 'flex',
    justifyContent: 'space-between',
    color: colors.colorSubTitle,
  },
  specs: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'clip',
    color: colors.colorSubTitle,
  },
})(ShopProductCard);

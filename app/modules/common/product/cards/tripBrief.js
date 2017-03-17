import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Card } from 'react-mdl/lib/Card';
import styles, { breakpoints, colors } from 'modules/common/styles';
import { formatPrices } from 'utils/displayUtils';
import Thumbnail from '../thumbnail';

const tripProductBriefCard = ({ product, sheet: { classes } }) => (
  <Card shadow={2} className={`${classes.card} ${styles.defaultTransition}`}>
    <Link to={`/trip/${product.objectId}`} className={classes.title}>
      <div className={classes.image}>
        <div className="_wrapper">
          <Thumbnail type="shop" thumbnail={product.thumbnail} />
        </div>
      </div>
      <div className={`${classes.priceAndName} ${styles.colorPrice}`}>
        <h6>{formatPrices(product.specs)}</h6>
        <p title={product.name}>{product.name}</p>
      </div>
    </Link>
  </Card>
  );

tripProductBriefCard.propTypes = {
  product: PropTypes.object.isRequired,
  sheet: PropTypes.object.isRequired,
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
    position: 'relative',
    backgroundSize: 'cover',
    width: '100%',
    paddingTop: '75%',
    '& > ._wrapper': {
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
    },
    '& i': {
      fontSize: 100,
      color: colors.colorLightGrey,
    },
    [breakpoints.mediaTabletBelow]: {
      width: '48px',
      margin: 8,
      paddingTop: '48px',
      '& i': {
        fontSize: 40,
      },
    },
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
})(tripProductBriefCard);

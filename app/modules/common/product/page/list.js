import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { productTypes } from 'appConstants';
import { breakpoints } from 'modules/common/styles';
import SupplyCard from '../cards/supply';
import LogisticsCard from '../cards/logistics';
import TripCard from '../cards/trip';
import ShopCard from '../cards/shop';

const cards = {
  [productTypes.supply]: SupplyCard,
  [productTypes.trip]: TripCard,
  [productTypes.logistics]: LogisticsCard,
  [productTypes.shop]: ShopCard,
};

const List = ({ type, products, classes }) => {
  const Card = cards[type];
  return (
    <div className={classes.products}>
      {
        products.map((product, i) => (
          <div key={i} className={type === productTypes.logistics ? classes.productHorizontal : classes.product}>
            <Card key={i} product={product} />
          </div>
        ))
      }
    </div>
  );
};

List.propTypes = {
  type: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  products: {
    display: 'flex',
    flexWrap: 'wrap',
    width: '100%',
  },
  product: {
    width: '25%',
    boxSizing: 'border-box',
    padding: '0 8px 16px',
    [breakpoints.mediaSmallScreen]: {
      width: '33.33%',
    },
    [breakpoints.mediaDestkopBelow]: {
      width: '33.33%',
    },
    '@media (max-width: 680px)': {
      width: '50%',
    },
    [breakpoints.mediaTabletBelow]: {
      width: '100%',
    },
  },
  productHorizontal: {
    width: '33.3%',
    boxSizing: 'border-box',
    padding: '0 8px 16px',
    [breakpoints.mediaSmallScreen]: {
      width: '50%',
    },
    [breakpoints.mediaDestkopBelow]: {
      width: '50%',
    },
    '@media (max-width: 680px)': {
      width: '100%',
    },
  },
})(List);

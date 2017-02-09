import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Checkbox from 'react-mdl/lib/Checkbox';
import { Tabs, Tab } from 'modules/common/raisingButtonTab';

const CartItem = ({ item, classes }) => {
  const product = item.shopProduct || item.supplyProduct;
  return (
    <div className={classes.cartItem}>
      <div>
        <Checkbox ripple defaultChecked />
      </div>
      <img role="presentation" className={classes.thumbnail} src={product.thumbnail.thumbnail_80_80} />
      <div className={classes.desc}>
        <p>{product.name}</p>
      </div>
      <div className={classes.specs}>
        <Tabs index={0}>
          {product.specs.map((spec, i) => <Tab key={i} label={spec.name}><div>{spec.toString()}</div></Tab>)}
        </Tabs>
      </div>
    </div>
  );
}

CartItem.propTypes = {
  item: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  cartItem: {
    padding: 16,
    display: 'flex',
    alignItems: 'flex-start',
  },
  avatar: {
    width: 30,
    height: 30,
    margin: '0 16px',
  },
  desc: {
    margin: '0 16px',
    '& > p': {
      margin: 0,
    },
  },
  specs: {
    display: 'flex',
  },
})(CartItem);

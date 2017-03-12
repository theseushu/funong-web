import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import Order from './order';

const Orders = ({ orders, address, changeOrder, classes }) => (
  <div className={classes.orders}>
    {
      _map(orders, (order, i) => (
        <Order
          key={i}
          order={order}
          address={address}
          onChange={(o) => changeOrder(i, o)}
        />
      ))
    }
  </div>
);

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  changeOrder: PropTypes.func.isRequired,
};

export default injectSheet({

})(Orders);

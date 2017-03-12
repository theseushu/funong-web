import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import Order from './order';

const Orders = ({ orders, classes }) => (
  <div className={classes.orders}>
    {
        _map(orders, (ordersOfType, type) => ordersOfType.map((order, i) => <Order key={`${type}${i}`} order={order} type={type} />))
      }
  </div>
  );

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.object.isRequired,
};

export default injectSheet({

})(Orders);

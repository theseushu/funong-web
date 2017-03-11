import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import { groupToOrder } from 'utils/orderUtils';
import Order from './order';

const Orders = ({ items, classes }) => {
  const allOrders = groupToOrder(items);
  return (
    <div className={classes.orders}>
      {
        _map(allOrders, (orders, type) => orders.map((order, i) => <Order key={`${type}${i}`} order={order} type={type} />))
      }
    </div>
  );
}

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};

export default injectSheet({

})(Orders);

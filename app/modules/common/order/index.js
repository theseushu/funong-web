import React, { PropTypes } from 'react';
import { statusValues } from 'appConstants';
import Confirmed from './order';
import Unconfirmed from './unconfirmed';

const Order = ({ order, ...props }) => (
  (order.status == null || order.status === statusValues.unconfirmed.value) ?
    <Unconfirmed order={order} {...props} /> : <Confirmed order={order} {...props} />
);
Order.propTypes = {
  order: PropTypes.object.isRequired,
};

export default Order;

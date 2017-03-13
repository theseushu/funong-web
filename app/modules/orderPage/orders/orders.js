import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import Order from './order';

const Orders = ({ orders, address, changeServices, changeServicesFee, classes }) => (
  <div className={classes.orders}>
    {
      _map(orders, (order, i) => (
        <Order
          key={i}
          order={order}
          address={address}
          changeServices={(services) => changeServices(i, services)}
          changeServicesFee={(fee) => changeServicesFee(i, fee)}
        />
      ))
    }
  </div>
);

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  changeServices: PropTypes.func.isRequired,
  changeServicesFee: PropTypes.func.isRequired,
};

export default injectSheet({

})(Orders);

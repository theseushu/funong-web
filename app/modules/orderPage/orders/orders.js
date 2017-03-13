import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import Order from './order';

const Orders = ({ orders, address, changeMessage, changeServices, changeServicesFee, changeDeliveryFee, classes }) => (
  <div className={classes.orders}>
    {
      _map(orders, (order, i) => (
        <Order
          key={i}
          order={order}
          address={address}
          changeMessage={(message) => changeMessage(i, message)}
          changeServices={(services) => changeServices(i, services)}
          changeServicesFee={(fee) => changeServicesFee(i, fee)}
          changeDeliveryFee={(fee) => changeDeliveryFee(i, fee)}
        />
      ))
    }
  </div>
);

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  address: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  changeMessage: PropTypes.func.isRequired,
  changeServices: PropTypes.func.isRequired,
  changeServicesFee: PropTypes.func.isRequired,
  changeDeliveryFee: PropTypes.func.isRequired,
};

export default injectSheet({

})(Orders);

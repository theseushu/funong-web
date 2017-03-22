import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import Order from 'modules/common/order';

const Orders = ({ user, orders, changeOrder, classes }) => (
  <div className={classes.orders}>
    {
      _map(orders, (order, i) => (
        <Order
          key={i}
          user={user}
          order={order}
          changeOrder={(o) => changeOrder(i, o)}
        />
      ))
    }
  </div>
);

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  changeOrder: PropTypes.func.isRequired,
};

export default injectSheet({

})(Orders);

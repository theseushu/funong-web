import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import injectSheet from 'react-jss';
import { breakpoints } from 'modules/common/styles';
import Order from 'modules/common/order';
import Page from '../page';

const Orders = ({ orders, classes }) => (
  <Page smallContent={false}>
    <div className={classes.content}>
      {
      _map(orders, (order, i) => (
        <Order
          key={i}
          order={order}
        />
      ))
    }
    </div>
  </Page>
);

Orders.propTypes = {
  classes: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
};

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
})(Orders);

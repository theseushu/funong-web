import React, { PropTypes } from 'react';
import _filter from 'lodash/filter';
import _reduce from 'lodash/reduce';
import injectSheet from 'react-jss';
import { statusValues } from 'funong-common/lib/appConstants';
import Button from 'modules/common/buttons/ApiButtonWithIcon';
import styles from 'modules/common/styles';
import { calculateOrder } from 'funong-common/lib/utils/orderUtils';

const Summary = (props) => {
  const { user, address, createOrders, pending, classes } = props;
  if (!address) {
    return (
      <div className={classes.summary}>
        <div className={classes.address}>
          <div><strong className={styles.colorAccent}>请先添加收货地址</strong></div>
        </div>
        <div>
          <Button
            accent
            raised
            ripple
            disabled
          >确认</Button>
        </div>
      </div>
    );
  }
  const orders = props.orders.map((order) => calculateOrder(order, user));
  const ordersReady = _filter(orders, ({ can }) => can.commit.to === statusValues.billed.value);
  const amount = _reduce(
    ordersReady,
    (sum, order) => sum + order.amount,
  0);
  const ordersNeedConfirm = _filter(orders, ({ can }) => can.commit.to === statusValues.unconfirmed.value);
  return (
    <div className={classes.summary}>
      <div className={classes.address}>
        <div><strong>寄送至：</strong>{address.address.details}</div>
        <div><strong>收货人：</strong>{address.contact}(收) {address.phone}</div>
      </div>
      <div className={classes.orders}>
        {ordersReady.length > 0 && <div>{`${ordersReady.length}单，合计`}<strong className={styles.colorPrice}>￥{amount}</strong></div>}
        {ordersNeedConfirm.length > 0 && <div>{`${ordersNeedConfirm.length}单需卖家确认`}</div>}
      </div>
      <div>
        <Button
          accent
          raised
          ripple
          icon="save"
          disabled={!address}
          pending={pending}
          onClick={() => {
            createOrders({ orders });
          }}
        >确认</Button>
      </div>
    </div>
  );
};

Summary.propTypes = {
  address: PropTypes.object,
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  orders: PropTypes.array.isRequired,
  createOrders: PropTypes.func.isRequired,
  pending: PropTypes.bool,
};

export default injectSheet({
  summary: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  address: {
    flex: 1,
    marginRight: 24,
  },
  orders: {
    marginRight: 24,
  },
})(Summary);

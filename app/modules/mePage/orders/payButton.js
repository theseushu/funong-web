import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Menu, { MenuItem } from 'react-mdl/lib/Menu';
import { statusValues } from 'funong-common/lib/appConstants';
import { calculateOrder } from 'funong-common/lib/utils/orderUtils';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import { actions, selectors } from 'api/order';
import { isMobile } from 'utils/screenUtils';
import pingpp from 'pingpp-js';
import { currentUserSelector } from 'modules/data/ducks/selectors';
// const debug = require('debug')('funong-web:modules/mePage/orders/payButton');

const PayButton = ({ single = false, generateBill, orders, pending }) => {
  const disabled = orders.length === 0 ||
    !!_find(orders, (order) => order.can.commit.available && order.can.commit.to !== statusValues.payed.value);
  const id = new Date().getTime();
  return (
    <div style={{ display: 'inline-block', position: 'relative' }}>
      <ApiButtonWithIcon
        key={0}
        colored
        icon="payment"
        id={id}
        pending={pending}
        disabled={disabled}
      >{single ? '付款' : '合并付款'}</ApiButtonWithIcon>
      <Menu target={id.toString()} ripple>
        <MenuItem
          onClick={() => generateBill({
            orders,
            channel: isMobile() ? 'alipay_wap' : 'alipay_pc_direct',
            meta: {
              resolve: (charge) => {
                pingpp.createPayment(charge, (result, err) => { // eslint-disable-line
                  if (result === 'success') {
                  // 只有微信公众账号 wx_pub 支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL。
                  } else if (result === 'fail') {
                  // charge 不正确或者微信公众账号支付失败时会在此处返回
                  } else if (result === 'cancel') {
                  // 微信公众账号支付取消支付
                  }
                });
              },
            },
          })}
        >支付宝</MenuItem>
        <MenuItem onClick={() => generateBill({ orders, channel: 'alipay_qr' })}>支付宝扫码支付</MenuItem>
        <MenuItem onClick={() => generateBill({ orders, channel: 'wx_pub_qr' })}>微信扫码支付</MenuItem>
      </Menu>
    </div>
  );
};

PayButton.propTypes = {
  single: PropTypes.bool,
  orders: PropTypes.array,
  generateBill: PropTypes.func.isRequired,
  pending: PropTypes.bool,
};

const generateBillAction = actions.generateBill;
const generateBillSelector = selectors.generateBill;

export default connect(
  (state, { orders }) => ({ ...generateBillSelector(state)[orders.map((o) => o.objectId).join('-')], currentUser: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({
    generateBill: ({ orders, meta = {}, ...params }) => generateBillAction({
      orderIds: orders.map((o) => o.objectId),
      meta: { ...meta, storeKey: orders.map((o) => o.objectId).join('-') },
      extra: {
        success_url: `${location.origin}/me/orders`,
      },
      ...params,
    }),
  }, dispatch),
  (stateProps, dispatchProps, { orders, ...ownProps }) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    orders: orders.map((order) => calculateOrder(order, stateProps.currentUser)),
  }),
)(PayButton);

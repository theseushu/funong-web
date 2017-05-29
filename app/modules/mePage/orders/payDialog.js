import React, { Component, PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import QRCode from 'qrcode.react';
import { statusValues } from 'funong-common/lib/appConstants';
import { calculateOrder } from 'funong-common/lib/utils/orderUtils';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import Dialog from 'modules/common/dialog/simpleDialog';
import { actions, selectors } from 'api/order';
import { isMobile } from 'utils/screenUtils';
import pingpp from 'pingpp-js';
import { currentUserSelector } from 'modules/data/ducks/selectors';

class PaymentDialog extends Component {
  static propTypes = {
    orders: PropTypes.array,
    generateBill: PropTypes.func.isRequired,
    pending: PropTypes.bool,
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    classes: PropTypes.object.isRequired,
  }
  state = { qrCode: null }
  generateQrCode = (url) => {
    this.setState({ qrCode: url });
  }
  render() {
    const { orders, pending, generateBill, open, onClose, classes } = this.props;
    const disabled = orders.length === 0 ||
      !!_find(orders, (order) => !order.can.commit || !order.can.commit.available || order.can.commit.to !== statusValues.payed.value);
    return (
      <Dialog
        show={open}
        onHide={onClose}
        onCancel={onClose}
        content={
          <div className={classes.payDialog}>
            <div className={classes.qrCode}>
              { this.state.qrCode && <QRCode size={256} value={this.state.qrCode} /> }
            </div>
            <ApiButtonWithIcon
              colored
              icon="payment"
              pending={pending}
              disabled={disabled}
              onClick={() => generateBill({
                orders,
                channel: isMobile() ? 'alipay_wap' : 'alipay_pc_direct',
                extra: {
                  success_url: `${location.origin}/me/orders`,
                },
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
            >支付宝</ApiButtonWithIcon>
            <ApiButtonWithIcon
              colored
              icon="payment"
              pending={pending}
              disabled={disabled}
              onClick={() => generateBill({ orders, channel: 'alipay_qr', meta: { resolve: (charge) => this.generateQrCode(charge.credential.alipay_qr) } })}
            >支付宝扫码支付</ApiButtonWithIcon>
            <ApiButtonWithIcon
              colored
              icon="payment"
              pending={pending}
              disabled={disabled}
              onClick={() => generateBill({
                orders,
                channel: 'wx_pub_qr',
                meta: { resolve: (charge) => this.generateQrCode(charge.credential.wx_pub_qr) },
              })
                }
            >微信扫码支付</ApiButtonWithIcon>
          </div>
        }
      />
    );
  }
}

const generateBillAction = actions.generateBill;
const generateBillSelector = selectors.generateBill;

export default connect(
  (state, { orders }) => ({ ...generateBillSelector(state)[orders.map((o) => o.objectId).join('-')], currentUser: currentUserSelector(state) }),
  (dispatch) => bindActionCreators({
    generateBill: ({ orders, meta = {}, ...params }) => generateBillAction({
      orderIds: orders.map((o) => o.objectId),
      meta: { ...meta, storeKey: orders.map((o) => o.objectId).join('-') },
      ...params,
    }),
  }, dispatch),
  (stateProps, dispatchProps, { orders, ...ownProps }) => ({
    ...stateProps,
    ...dispatchProps,
    ...ownProps,
    orders: orders.map((order) => calculateOrder(order, stateProps.currentUser)),
  }),
)(injectSheet({
  payDialog: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qrCode: {
    margin: 16,
  },
})(PaymentDialog));

import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { statusValues } from 'funong-common/lib/appConstants';
import success from 'modules/toastr/success';
import ApiButtonWithIcon from 'modules/common/buttons/ApiButtonWithIcon';
import { actions, selectors } from 'api/order';
import { stripOrder, commitButtonName } from 'funong-common/lib/utils/orderUtils';
const debug = require('debug')('funong-web:modules/mePage/orders/commitButton');

const CommitButton = ({ commit, commitState, order, changed = false, onSuccess }) => (
  <ApiButtonWithIcon
    key={0}
    colored
    icon="save"
    pending={commitState ? commitState.pending : false}
    disabled={!order.can.commit.available || (order.can.commit.to === statusValues.unconfirmed.value && !changed)}
    onClick={() => commit({
      order: stripOrder(order),
      meta: {
        resolve: (o) => {
          onSuccess(o);
          let title;
          let message;
          switch (o.status) {
            case statusValues.finished.value:
              title = '订单已完成';
              break;
            case statusValues.shipped.value:
              title = '收货完毕';
              message = '评价一下货品和服务吧！';
              break;
            case statusValues.shipping.value:
              title = '修改成功';
              message = '订单已发货，请等待买家收货';
              break;
            case statusValues.payed.value:
              title = '付款成功';
              message = '订单已付款，请等待卖家发货';
              break;
            case statusValues.billed.value:
              title = '确认成功';
              message = '订单已确认，请等待买家付款';
              break;
            case statusValues.unconfirmed.value:
              title = '保存成功';
              message = '订单已修改成功';
              break;
            default:
              debug('订单状态出错');
          }
          success({ title, message });
        },
      },
    })}
  >{commitButtonName(order.can.commit.to)}</ApiButtonWithIcon>
  );

CommitButton.propTypes = {
  order: PropTypes.object.isRequired,
  onSuccess: PropTypes.func.isRequired,
  changed: PropTypes.bool,
  commit: PropTypes.func.isRequired,
  commitState: PropTypes.object,
};

const commitAction = actions.commit;
const commitSelector = selectors.commit;

export default connect(
  (state, { order }) => ({ commitState: commitSelector(state)[order.objectId] }),
  (dispatch) => bindActionCreators({ commit: ({ order, meta = {} }) => commitAction({ order, meta: { ...meta, storeKey: order.objectId } }) }, dispatch),
)(CommitButton);

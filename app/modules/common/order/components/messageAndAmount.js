import React, { PropTypes } from 'react';
import _map from 'lodash/map';
import Textfield from 'react-mdl/lib/Textfield';
import { orderFeeTypes } from 'appConstants';
import { calculateAmount, calculateProductAmount } from 'utils/orderUtils';

const MessageAndAmount = ({ onChange, order, classes }) => {
  const amount = calculateAmount(order);
  const productAmount = calculateProductAmount(order);
  const { message, otherFees } = order;
  return (
    <div className={`${classes.line} ${classes.messages}`}>
      <div className="_left">
        <Textfield
          label="给卖家留言"
          rows={3}
          className={classes.message}
          value={message || ''}
          onChange={(e) => onChange(e.target.value)}
        />
      </div>
      <div className="_right">
        <div className={classes.amount}>
          <div><small>商品总价：</small>￥{productAmount}</div>
          { _map(otherFees, (value, key) => (
            <div key={key}>
              <small>{orderFeeTypes[key].title}：</small>
              {value == null ? '待议' : `￥${value}`}
            </div>
          ))}
          <div><small>总价：</small>{amount == null ? '待议' : `￥${amount}`}</div>
        </div>
      </div>
    </div>
  );
};
MessageAndAmount.propTypes = {
  classes: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  order: PropTypes.object.isRequired,
};

export default MessageAndAmount;

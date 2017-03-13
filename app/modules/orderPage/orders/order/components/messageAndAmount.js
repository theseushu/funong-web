import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
import Textfield from 'react-mdl/lib/Textfield';
import { orderFeeTypes } from 'appConstants';

const MessageAndAmount = ({ message, onChange, productAmount, otherFees, classes }) => (
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
        <div><small>总价：</small>{_find(otherFees, (value) => value == null) ? '待议' : _reduce(otherFees, (sum, value) => sum + value, productAmount)}</div>
      </div>
    </div>
  </div>
  );
MessageAndAmount.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  productAmount: PropTypes.number.isRequired,
  otherFees: PropTypes.object.isRequired,
};

export default MessageAndAmount;

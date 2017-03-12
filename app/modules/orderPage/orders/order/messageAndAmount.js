import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import _reduce from 'lodash/reduce';
import Textfield from 'react-mdl/lib/Textfield';

const MessageAndAmount = ({ message, onChange, productAmount, addtionalFees = [], classes }) => (
  <div className={`${classes.line} ${classes.messages}`}>
    <div className="_left">
      <Textfield
        label="给卖家留言"
        rows={3}
        className={classes.message}
        value={message || ''}
        onChange={(e) => onChange({ message: e.target.value })}
      />
    </div>
    <div className="_right">
      <div className={classes.amount}>
        <div><small>商品总价：</small>￥{productAmount}</div>
        { addtionalFees.length === 0 && <div><small>附加费用：</small>￥0</div> }
        { addtionalFees.map(({ title, value, desc }, i) => (
          <div key={i}>
            <small>{title}：</small>
            {value == null ? '待议' : `￥${value}`}
            { desc && <br />}
            { desc && <small>({desc})</small>}
          </div>
          )) }
        <div><small>总价：</small>{_find(addtionalFees, ({ value }) => value == null) ? '待议' : _reduce(addtionalFees, (sum, { value }) => sum + value, productAmount)}</div>
      </div>
    </div>
  </div>
  );
MessageAndAmount.propTypes = {
  classes: PropTypes.object.isRequired,
  message: PropTypes.string,
  onChange: PropTypes.func.isRequired,
  productAmount: PropTypes.number.isRequired,
  addtionalFees: PropTypes.array,
};

export default MessageAndAmount;

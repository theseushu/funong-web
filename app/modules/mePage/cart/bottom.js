import React, { PropTypes } from 'react';
import _filter from 'lodash/filter';
import _reduce from 'lodash/reduce';
import _without from 'lodash/without';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import Button from 'react-mdl/lib/Button';
import Checkbox from 'react-mdl/lib/Checkbox';
import { publishTypes, publishTypesInfo } from 'funong-common/lib/appConstants';
import styles, { colors, breakpoints } from 'modules/common/styles';
import RemoveItemsButton from './removeItemsButton';

const Bottom = ({ classes, cartItems, selected, error, onSelect, onDeselect, onItemsRemoved, onOrder }) => {
  if (cartItems.length === 0) {
    return null;
  }
  const selectedItems = _filter(cartItems, (item) => selected.indexOf(item.objectId) >= 0);
  // disable pricing & making order if there's error in selected items
  const disabled = _without(selected, ...Object.keys(error)).length < selected.length;
  // calculate amount
  const amount = disabled ? '请修改购买数量' : _reduce(selectedItems, (sum, item) => {
    const type = _find(publishTypes, (t) => !!item[t]);
    const info = publishTypesInfo[type];
    if (info.saleType === 1) {
      const { quantity, specIndex } = item;
      const product = item[type];

      const spec = product.specs[specIndex];
      return sum + (spec.price * Number(quantity));
    }
    return sum;
  }, 0);
  return (
    <div className={classes.bottom}>
      <div className={classes.checkboxAndItemCount}>
        <div className={classes.checkbox}>
          <Checkbox
            label="全选"
            ripple
            checked={selected.length === cartItems.length}
            onChange={(e) => {
              if (e.target.checked) {
                onSelect();
              } else {
                onDeselect();
              }
            }}
          />
        </div>
        <div className={classes.itemCount}>
          {`选中${selected.length}个`}
        </div>
        <div className={classes.actions}>
          <RemoveItemsButton cartItemIds={selected} onItemsRemoved={onItemsRemoved} />
          <Button>收藏</Button>
        </div>
      </div>
      <div className={classes.amountAndOrder}>
        <div className={classes.amount}>
          合计：<span className={styles.colorPrice}>{ amount }</span>
        </div>
        <div className={classes.order}>
          <Button
            disabled={disabled || selected.length === 0}
            colored
            onClick={() => onOrder(selectedItems)}
          >下单</Button>
        </div>
      </div>
    </div>
  );
};

Bottom.propTypes = {
  classes: PropTypes.object.isRequired,
  cartItems: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
  onSelect: PropTypes.func.isRequired,
  onDeselect: PropTypes.func.isRequired,
  onOrder: PropTypes.func.isRequired,
  onItemsRemoved: PropTypes.func.isRequired,
};

export default injectSheet({
  bottom: {
    display: 'flex', padding: '4px 0 4px 16px', background: colors.colorLightGrey,
  },
  checkboxAndItemCount: {
    display: 'flex',
    alignItems: 'center',
  },
  checkbox: {
    display: 'inline-block',
  },
  itemCount: {
    display: 'inline-block',
    margin: '0 16px',
    color: colors.colorSubTitle,
  },
  amountAndOrder: {
    flex: 1,
    display: 'flex',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  amount: {
    margin: '0 16px',
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  order: {
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
})(Bottom);

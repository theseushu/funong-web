import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import _without from 'lodash/without';
import { colors } from 'modules/common/styles';
import Owner from './owner';
import CartItem from './cartItem';

const Group = ({ owner, shop, items, select, deselect, selected, onItemChange, error, classes }) => {
  const itemIds = items.map((i) => i.objectId);
  const groupChecked = _without(itemIds, ...selected).length === 0;
  return (
    <div className={classes.group}>
      <Owner
        user={owner}
        shop={shop}
        checked={groupChecked}
        onChange={() => {
          if (groupChecked) {
            deselect(itemIds);
          } else {
            select(itemIds);
          }
        }}
      />
      {items.map((item, i) => {
        const checked = selected.indexOf(item.objectId) >= 0;
        return (
          <CartItem
            key={i} item={item}
            checked={selected.indexOf(item.objectId) >= 0}
            onChange={() => {
              if (checked) {
                deselect([item.objectId]);
              } else {
                select([item.objectId]);
              }
            }}
            onItemChange={(value) => onItemChange(item.objectId, value)}
            error={error[item.objectId]}
          />);
      })
      }
    </div>
  );
};

Group.propTypes = {
  classes: PropTypes.object,
  owner: PropTypes.object,
  shop: PropTypes.object,
  items: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
  onItemChange: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
};
export default injectSheet({
  group: {
    marginTop: 16,
    paddingBottom: 16,
    borderBottom: `solid 1px ${colors.colorLightGrey}`,
  },
})(Group);

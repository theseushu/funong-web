import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import _without from 'lodash/without';
import { publishTypesInfo } from 'funong-common/lib/appConstants';
import { colors } from 'modules/common/styles';
import Owner from './owner';
import CartItem from './cartItem';

const Group = ({ type, items, select, deselect, selected, onItemChange, onItemsRemoved, error, classes }) => {
  const info = publishTypesInfo[type];
  const itemIds = items.map((i) => i.objectId);
  const groupChecked = _without(itemIds, ...selected).length === 0;
  return (
    <div className={classes.group}>
      <Owner
        user={info.shop ? null : items[0][type].owner}
        shop={info.shop ? items[0][type].shop : null}
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
            type={type}
            checked={selected.indexOf(item.objectId) >= 0}
            onChange={() => {
              if (checked) {
                deselect([item.objectId]);
              } else {
                select([item.objectId]);
              }
            }}
            onItemChange={(value) => onItemChange(item.objectId, value)}
            onItemsRemoved={onItemsRemoved}
            error={error[item.objectId]}
          />);
      })
      }
    </div>
  );
};

Group.propTypes = {
  classes: PropTypes.object,
  type: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
  onItemChange: PropTypes.func.isRequired,
  onItemsRemoved: PropTypes.func.isRequired,
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

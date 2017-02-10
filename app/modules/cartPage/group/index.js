import React, { PropTypes } from 'react';
import _without from 'lodash/without';
import Owner from './owner';
import CartItem from './cartItem';

const Group = ({ owner, items, select, deselect, selected, onQuantityChange, error }) => {
  const itemIds = items.map((i) => i.objectId);
  const groupChecked = _without(itemIds, ...selected).length === 0;
  return (
    <div>
      <Owner
        user={owner}
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
            onQuantityChange={(value) => onQuantityChange(item.objectId, value)}
            error={error[item.objectId]}
          />);
      })
      }
    </div>
  );
};

Group.propTypes = {
  owner: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  select: PropTypes.func.isRequired,
  deselect: PropTypes.func.isRequired,
  onQuantityChange: PropTypes.func.isRequired,
  selected: PropTypes.array.isRequired,
  error: PropTypes.object.isRequired,
};
export default Group;

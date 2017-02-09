import React, { PropTypes } from 'react';
import Owner from './owner';
import CartItem from './cartItem';

const Group = ({ owner, items }) => (
  <div>
    <Owner user={owner} />
    {items.map((item, i) => <CartItem key={i} item={item} />)}
  </div>
);

Group.propTypes = {
  owner: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
};
export default Group;

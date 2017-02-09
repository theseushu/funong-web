import React, { PropTypes } from 'react';
import _groupBy from 'lodash/groupBy';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import { cartItemsSelector } from 'modules/data/ducks/selectors';
import Group from './group';
import emptyCart from './assets/empty.png';

const Page = ({ cartItems }) => {
  const groups = Object.values(_groupBy(cartItems, (item) => item.owner.objectId));
  return (
    <div style={{ width: '100%' }}>
      {groups.length === 0 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <div style={{ width: 100, height: 100, background: `url(${emptyCart})` }} />
          <div>
            <h5 style={{ marginLeft: 16 }}>您的购物车还是空的</h5>
            <div>
              <Link to="/me/bookmarks"><Button colored>看看我的收藏</Button></Link>
              <Link to="/me/orders"><Button colored>看看订单</Button></Link>
            </div>
          </div>
        </div>
      )}
      {groups.map((group, i) => <Group key={i} owner={group[0].owner} items={group} />)}
    </div>
  );
}

Page.propTypes = {
  cartItems: PropTypes.array.isRequired,
}

export default connect(
  (state) => ({ cartItems: cartItemsSelector(state) })
)(Page);

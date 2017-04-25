import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { publishTypesInfo } from 'funong-common/lib/appConstants';
import { colors } from 'modules/common/styles';
import { Avatar } from 'modules/common/user';
import { Thumbnail as ShopThumbnail } from 'modules/common/shop';
import { isOwner as isOrderOwner } from 'funong-common/lib/utils/orderUtils';

const Owner = ({ user, order, classes }) => {
  const isOwner = isOrderOwner(order, user);
  const { type } = order;
  return (
    <div className={classes.owner}>
      <div className={classes.title}>
        { isOwner && publishTypesInfo[type].shop ? '店铺：' : '卖家：' }
        { !isOwner && '买家：' }
      </div>
      <div className={classes.avatar}>
        { isOwner && publishTypesInfo[type].shop ? <ShopThumbnail shop={order.shop} /> : <Avatar user={order.user} /> }
        { !isOwner && <Avatar user={user} /> }
      </div>
      { isOwner && publishTypesInfo[type].shop ? <div>{order.shop.name}</div> : <div>{order.user.name}</div> }
      { !isOwner && <div>{user.name}</div> }
    </div>
  );
};

Owner.propTypes = {
  order: PropTypes.object,
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  owner: {
    display: 'flex',
    alignItems: 'center',
    color: colors.colorSubTitle,
    height: 32, // to align with cardMenu button
  },
  title: {
    marginRight: 16,
  },
  avatar: {
    width: 20,
    height: 20,
    marginRight: 4,
  },
})(Owner);

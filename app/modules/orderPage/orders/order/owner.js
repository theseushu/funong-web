import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { colors } from 'modules/common/styles';
import { Avatar } from 'modules/common/avatar';
import ShopAvatar from 'modules/common/shop/avatar';

const Owner = ({ user, shop, classes }) => (
  <div className={classes.owner}>
    <div className={classes.title}>
      { user && '卖家：'}
      { shop && '店铺：'}
    </div>
    <div className={classes.avatar}>
      { user && <Avatar user={user} /> }
      { shop && <ShopAvatar shop={shop} /> }
    </div>
    <div>{user && user.name}</div>
    <div>{shop && shop.name}</div>
  </div>
);

Owner.propTypes = {
  shop: PropTypes.object,
  user: PropTypes.object,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  owner: {
    display: 'flex',
    alignItems: 'center',
    color: colors.colorSubTitle,
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

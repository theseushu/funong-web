import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Checkbox from 'react-mdl/lib/Checkbox';
import { colors } from 'modules/common/styles';
import { Avatar } from 'modules/common/avatar';
import ShopAvatar from 'modules/common/shop/avatar';

const Owner = ({ user, shop, classes, checked, onChange }) => (
  <div className={classes.owner}>
    <div>
      <Checkbox ripple checked={checked} onChange={onChange} />
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
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default injectSheet({
  owner: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
    color: colors.colorSubTitle,
  },
  avatar: {
    width: 30,
    height: 30,
    margin: '0 16px',
  },
})(Owner);

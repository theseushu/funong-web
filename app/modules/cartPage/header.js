import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import Checkbox from 'react-mdl/lib/Checkbox';
import { colors, breakpoints } from 'modules/common/styles';
import layout from './layout';
import emptyCart from './assets/empty.png';

const Header = ({ classes, groups, cartItems, selected }) => {
  if (groups.length === 0) {
    return (
      <div className={classes.empty}>
        <div className="_empty_image" />
        <div>
          <h5>您的购物车还是空的</h5>
          <div>
            <Link to="/me/bookmarks"><Button colored>看看我的收藏</Button></Link>
            <Link to="/me/orders"><Button colored>看看订单</Button></Link>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className={classes.header}>
      <div className={classes.checkboxAndName}>
        <div className={classes.checkbox}>
          <Checkbox label="全选" ripple checked={selected.length === cartItems.length} onChange={() => {}} />
        </div>
        <div className={classes.name}>
          名称
        </div>
      </div>
      <div className={classes.spec}>
        规格
      </div>
      <div className={classes.quantity}>
        数量/小计
      </div>
      <div className={classes.actions}>
      </div>
    </div>
  );
};

Header.propTypes = {
  classes: PropTypes.object.isRequired,
  groups: PropTypes.array.isRequired,
  cartItems: PropTypes.array.isRequired,
  selected: PropTypes.array.isRequired,
};

export default injectSheet({
  empty: {
    display: 'flex',
    justifyContent: 'center',
    '& > ._empty_image': {
      width: 100, height: 100, background: `url(${emptyCart})`, marginRight: 16,
    },
  },
  header: {
    display: 'flex', padding: '4px 0 4px 16px', marginBottom: 16, background: colors.colorLightGrey,
  },
  checkboxAndName: {
    width: layout.title.checkboxAndName.width,
    marginRight: layout.title.checkboxAndName.marginRight,
  },
  checkbox: {
    display: 'inline-block',
    marginRight: layout.title.checkboxAndName.checkbox.marginRight,
  },
  name: {
    display: 'inline-block',
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  spec: {
    flex: '1',
    margin: `0 ${layout.title.spec.margin}px`,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  quantity: {
    width: layout.title.countAndAmount.width,
    marginLeft: layout.title.countAndAmount.marginLeft,
    marginRight: layout.title.countAndAmount.marginRight,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  actions: {
    width: layout.title.actions.width,
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
})(Header);

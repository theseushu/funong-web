import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Layout from 'modules/common/layout';
import Avatar from 'modules/common/avatar';
import { colors } from 'modules/common/styles';
import { actions as pageActions } from './ducks';
import { currentUserSelector } from '../data/ducks/selectors';


const sideRoutes = (type) => [
  { title: type === '微店店主' ? '店铺信息' : '个人信息', path: '/me' },
  { title: '实名认证', path: '/me/certs' },
  { title: '商品管理', path: '/me/products' },
  { title: '购物车', path: '/cart' },
  { title: '历史订单', path: '/me/orders' },
  { title: '我的收藏', path: '/me/bookmarks' },
];

const MePage = ({ user: { profile: { avatar, type } }, sheet: { classes }, children }, { router }) => (
  <Layout
    header={avatar ? <div className={classes.headerAvatar}><Avatar /></div> : null}
    sideMenu={sideRoutes(type)}
    content={children}
    smallContent={!router.isActive('/me/products')}
  >
  </Layout>
);

MePage.contextTypes = {
  router: PropTypes.object.isRequired,
};
MePage.propTypes = {
  sheet: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
};

export default connect(
  (state) => ({ ...state.profilePage, user: currentUserSelector(state) }),
  (dispatch) => ({ actions: bindActionCreators(pageActions, dispatch) }),
)(injectSheet({
  avatar: {
    width: 160,
    height: 160,
    marginTop: -95, // padding 15 of panel
    marginLeft: 'auto',
    marginRight: 'auto',
    position: 'relative',
  },
  headerAvatar: {
    height: 150,
    width: 150,
    padding: 2,
    borderRadius: '50%',
    border: `solid 1px ${colors.colorPrimary}`,
    '.is-compact &': {
      height: 50,
      width: 50,
    },
  },
})(MePage));

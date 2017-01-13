import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { actions as pageActions } from './ducks';
import { currentUserSelector } from '../data/ducks/selectors';

import Layout from '../common/layout';
import Avatar from '../common/avatar';

import { colors } from '../common/styles';

const sideRoutes = [
  { title: '个人信息', path: '/me' },
  { title: '实名认证', path: '/me/certs' },
  { title: '购物车', path: '/me/cart' },
  { title: '历史订单', path: '/me/orders' },
  { title: '我的收藏', path: '/me/bookmarks' },
];

const MePage = ({ user: { profile }, sheet: { classes }, children }) => (
  <Layout
    header={profile && profile.avatar ? <div className={classes.headerAvatar}><Avatar /></div> : null}
    sideMenu={sideRoutes}
    content={children}
  >
  </Layout>
);

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

import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Layout from 'modules/common/layout';
import { colors } from 'modules/common/styles';
import { actions as pageActions } from './ducks';

const sideRoutes = () => [
  { title: '个人信息', path: '/me' },
  { title: '认证',
    path: '/me/certs',
    routes: [{
      title: '实名认证',
      path: '/me/certs?type=personal',
    }, {
      title: '商家认证',
      path: '/me/certs?type=company',
    }, {
      title: '专家认证',
      path: '/me/certs?type=expert',
    },
    ],
  },
  { title: '我发布的', path: '/me/products' },
  { title: '我的微店',
    path: '/me/shop',
    routes: [{
      title: '店铺信息',
      path: '/me/shop',
    }, {
      title: '商品',
      path: '/me/shop/products',
    }],
  },
  { title: '购物车', path: '/cart' },
  { title: '历史订单', path: '/me/orders' },
  { title: '我的收藏', path: '/me/bookmarks' },
];

const MePage = ({ user: { avatar, type }, sheet: { classes }, children, smallContent = true }, { router }) => {
  const routes = sideRoutes(type).map((route) => {
    if (route.path !== '/me/products') {
      const active = router.isActive(route.path, true);
      return { ...route, active };
    }
    const active = router.isActive('/me/products', true) || router.isActive('/me/products/supply', true) || router.isActive('/me/products/shop', true);
    return { ...route, active };
  });
  return (
    <Layout
      sideMenu={routes}
      content={children}
      smallContent={smallContent}
    >
    </Layout>
  );
};

MePage.contextTypes = {
  router: PropTypes.object.isRequired,
};
MePage.propTypes = {
  sheet: PropTypes.object.isRequired,
  children: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
  smallContent: PropTypes.bool,
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

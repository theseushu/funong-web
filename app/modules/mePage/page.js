import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Layout from 'modules/common/layout';
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
  { title: '我发布的',
    path: '/me/published/supply',
    routes: [{
      title: '供应',
      path: '/me/published/supply',
    }, {
      title: '采购',
      path: '/me/published/inquiry',
    }, {
      title: '报价',
      path: '/me/published/bid',
    }, {
      title: '物流',
      path: '/me/published/logistics',
    }, {
      title: '乡村游',
      path: '/me/published/trip',
    }],
  },
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

const MePage = ({ user: { type }, children, smallContent = true }, { router }) => {
  const routes = sideRoutes(type).map((route) => {
    if (route.path !== '/me/published') {
      const active = router.isActive(route.path, true);
      return { ...route, active };
    }
    const active = router.isActive('/me/published', true) || router.isActive('/me/published/supply', true) || router.isActive('/me/published/shop', true);
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
  children: PropTypes.any.isRequired,
  user: PropTypes.object.isRequired,
  smallContent: PropTypes.bool,
};

export default connect(
  (state) => ({ ...state.profilePage, user: currentUserSelector(state) }),
  (dispatch) => ({ actions: bindActionCreators(pageActions, dispatch) }),
)(MePage);

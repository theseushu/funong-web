import React, { PropTypes } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { Layout } from 'modules/common/layouts';
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
  { title: '购物车', path: '/me/cart' },
  { title: '历史订单', path: '/me/orders' },
  { title: '我的收藏', path: '/me/bookmarks' },
];

const MePage = ({ location: { query }, helmet, user: { type }, header, children, smallContent = true }) => {
  const allRoutes = query && query.farm ? sideRoutes(type).map((route) => ({
    ...route,
    path: route.path.indexOf('?') > 0 ? `${route.path}&farm=true` : `${route.path}?farm=true`,
    routes: (route.routes && route.routes.length > 0) ? route.routes.map((r) => ({
      ...r,
      path: r.path.indexOf('?') > 0 ? `${r.path}&farm=true` : `${r.path}?farm=true`,
    })) : undefined,
  })) : sideRoutes(type);
  const routes = allRoutes;
  return (
    <Layout
      helmet={helmet || { title: '富农商城-个人信息' }}
      sideMenu={routes}
      small={smallContent}
      header={header}
    >
      {children}
    </Layout>
  );
};

MePage.propTypes = {
  children: PropTypes.any.isRequired,
  location: PropTypes.object.isRequired,
  helmet: PropTypes.object,
  header: PropTypes.object,
  user: PropTypes.object.isRequired,
  smallContent: PropTypes.bool,
};

export default connect(
  (state) => ({ ...state.profilePage, user: currentUserSelector(state) }),
  (dispatch) => ({ actions: bindActionCreators(pageActions, dispatch) }),
)(MePage);

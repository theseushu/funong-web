import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { routes, publishTypes, publishTypesInfo } from 'appConstants';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { Layout } from 'modules/common/layouts';

const sideRoutes = () => [
  { title: '个人信息', path: routes.page_me },
  { title: '认证',
    path: routes.page_my_certs,
    routes: [{
      title: '实名认证',
      path: `${routes.page_my_certs}?type=personal`,
    }, {
      title: '商家认证',
      path: `${routes.page_my_certs}?type=company`,
    }, {
      title: '专家认证',
      path: `${routes.page_my_certs}?type=expert`,
    },
    ],
  },
  { title: '我发布的',
    path: routes[`page_my_${publishTypesInfo[publishTypes.supply].plural}`],
    routes: [{
      title: '供应',
      path: routes[`page_my_${publishTypesInfo[publishTypes.supply].plural}`],
    }, {
      title: '采购',
      path: routes.page_my_inquiries,
    }, {
      title: '报价',
      path: routes.page_my_bids,
    }, {
      title: '物流',
      path: routes[`page_my_${publishTypesInfo[publishTypes.logistics].plural}`],
    }, {
      title: '乡村游',
      path: routes[`page_my_${publishTypesInfo[publishTypes.trip].plural}`],
    }],
  },
  { title: '我的微店',
    path: routes.page_my_shop,
    routes: [{
      title: '店铺信息',
      path: routes.page_my_shop,
    }, {
      title: '商品',
      path: routes[`page_my_${publishTypesInfo[publishTypes.product].plural}`],
    }, {
      title: '抢购',
      path: routes[`page_my_${publishTypesInfo[publishTypes.flashSale].plural}`],
    }],
  },
  { title: '购物车', path: routes.page_my_cart },
  { title: '历史订单', path: routes.page_my_orders },
  { title: '我的收藏', path: routes.page_my_bookmarks },
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
  return (
    <Layout
      helmet={helmet || { title: '富农商城-个人信息' }}
      sideMenu={allRoutes}
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
)(MePage);

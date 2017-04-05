import React from 'react';
import Helmet from 'react-helmet';
import Icon from 'react-mdl/lib/Icon';
import Layout from './layout';

const routes = {
  supply: { title: '供应', icon: 'goat', path: '/supplies' },
  inquiry: { title: '采购', icon: 'network_check', path: '/inquiries' },
  trip: { title: '乡村游', icon: 'rowing', path: '/trips' },
  meFarm: { title: '我的富农', icon: 'person', path: '/me?farm=true' },
  me: { title: '我的富农', icon: 'person', path: '/me' },
  logistics: { title: '物流', icon: 'local_shipping', path: '/logisticsList' },
  product: { title: '微店', icon: 'shopping_basket', path: '/products' },
  flashSale: { title: '秒杀', icon: 'add_alert', path: '/flashSales' },
};

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

const HomePage = () => (
  <div>
    <Helmet
      title="欢迎来到富农商城"
      meta={[
        { name: 'welcome', content: 'welcome' },
      ]}
    />
    <Layout sideMenu={sideRoutes()}>
      <div>
        {Object.values(routes).map(({ icon }, i) => <Icon key={i} name={icon} />)}
      </div>
    </Layout>
  </div>
);

HomePage.propTypes = {
};

export default HomePage;

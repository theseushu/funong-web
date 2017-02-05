import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';

const tabs = (props, { router }) => {
  let activeTab = 2;
  if (router.isActive('/me/products', true) || router.isActive('/me/products/supply')) {
    activeTab = 0;
  } else if (router.isActive('/me/products/logistics')) {
    activeTab = 1;
  }
  return (
    <Tabs
      activeTab={activeTab}
      onChange={(tabId) => {
        if (tabId === 0) {
          router.push('/me/products/supply');
        } else if (tabId === 1) {
          router.push('/me/products/logistics');
        } else {
          router.push('/me/products/shop');
        }
      }} ripple
    >
      <Tab>农资农产供应</Tab>
      <Tab>物流</Tab>
      <Tab>微店商品</Tab>
    </Tabs>
  );
};

tabs.contextTypes = {
  router: PropTypes.object.isRequired,
};
tabs.propTypes = {
};

export default tabs;

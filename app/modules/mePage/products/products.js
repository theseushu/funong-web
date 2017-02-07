import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import { breakpoints } from 'modules/common/styles';
import Page from '../page';

const Products = ({ children, sheet: { classes } }, { router }) => (
  <Page smallContent={false}>
    <div className={classes.content}>
      <Tabs
        activeTab={() => {
          if (router.isActive('/me/products/supply')) {
            return 0;
          } else if (router.isActive('/me/products/logistics')) {
            return 1;
          }
          return 2;
        }}
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
      {children}
    </div>
  </Page>
);
Products.contextTypes = {
  router: PropTypes.object.isRequired,
};
Products.propTypes = {
  sheet: PropTypes.object.isRequired,
  children: PropTypes.object,
};

export default injectSheet({
  content: {
    flex: '1',
    marginLeft: 24,
    [breakpoints.mediaDestkopBelow]: {
      marginLeft: 0,
    },
  },
  avatar: {
    width: 100,
    height: 100,
    position: 'relative',
  },
})(Products);

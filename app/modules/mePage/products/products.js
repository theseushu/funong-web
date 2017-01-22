import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import { breakpoints } from '../../common/styles';

const Products = ({ children, sheet: { classes } }, { router }) => (
  <div className={classes.content}>
    <Tabs activeTab={router.isActive('/me/products/supply') ? 0 : 1} onChange={(tabId) => router.push(tabId === 0 ? '/me/products/supply' : '/me/products/shop')} ripple>
      <Tab>农资农产供应</Tab>
      <Tab>微店商品</Tab>
    </Tabs>
    {children}
  </div>
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

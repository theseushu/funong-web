import React, { PropTypes } from 'react';
import { Tabs, Tab } from 'react-mdl/lib/Tabs';
import injectSheet from 'react-jss';
import _findIndex from 'lodash/findIndex';

const SideMenu = ({ routes, sheet: { classes } }, { router }) => (
  <div>
    <Tabs
      activeTab={_findIndex(routes, (route) => route.active)}
      className={[classes.sidebar, 'mdl-shadow--2dp'].join(' ')}
      ripple
    >
      { routes.map((route, i) => <Tab
        key={i}
        onClick={() => router.push(route.path)}
      >{route.title}</Tab>)}
    </Tabs>
  </div>
  );

SideMenu.contextTypes = {
  router: PropTypes.object.isRequired,
};
SideMenu.propTypes = {
  sheet: PropTypes.object,
  routes: PropTypes.array.isRequired,
};


export default injectSheet({
  sidebar: {
    '& .mdl-tabs__tab-bar': {
      flexDirection: 'column',
      alignItems: 'stretch',
      height: 'auto',
      borderBottom: 'none',
      padding: '4px 16px 8px 16px',
    },
    '& .mdl-tabs__tab': {
      textAlign: 'left',
    },
    '@media (max-width: 839px)': {
      display: 'none',
    },
  },
})(SideMenu);

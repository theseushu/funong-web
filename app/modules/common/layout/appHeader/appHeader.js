import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Header, HeaderRow, HeaderTabs } from 'react-mdl/lib/Layout';
import { Tab } from 'react-mdl/lib/Tabs';
import _findIndex from 'lodash/findIndex';

import logo from '../../../../assets/logo.png';
import background from './assets/header-bg.jpg';

import styles from '../../styles';

const routes = [
  { title: '首页', path: '/' },
  { title: '供应', path: '/supplies' },
  { title: '采购', path: '/' },
  { title: '微店', path: '/shops' },
  { title: '市场行情', path: '/market' },
  { title: '我的润财', path: '/me' },
];

const AppHeader = ({ sheet: { classes }, header }, { router }) => (
  <Header waterfall hideTop={false} className={classes.header}>
    <HeaderRow className={classes.logoRow}>
      { header || <div className={classes.logo} /> }
    </HeaderRow>
    <HeaderTabs activeTab={_findIndex(routes, (route) => router.isActive(route.path))} ripple className={[styles.container, classes.nav].join(' ')}>
      { routes.map((route, i) => <Tab
        key={i}
        onClick={() => router.push(route.path)}
      >{route.title}</Tab>)}
    </HeaderTabs>
  </Header>
  );

AppHeader.contextTypes = {
  router: PropTypes.object.isRequired,
};

AppHeader.propTypes = {
  sheet: PropTypes.object,
  header: PropTypes.any,
};

export default injectSheet({
  header: {
    background: `url(${background})`,
    '& .mdl-layout__tab-bar-container': {
      background: 'rgba(76,175,80, 0.08)',
    },
  },
  logoRow: {
    justifyContent: 'center',
    padding: 0,
    minHeight: 200,
    '.is-compact &': {
      minHeight: 0,
    },
  },
  logo: {
    background: `url(${logo})`,
    backgroundSize: 'cover',
    height: 150,
    width: 150,
    '.is-compact &': {
      height: 50,
      width: 50,
    },
  },
  nav: {
    background: 'transparent',
  },
})(AppHeader);

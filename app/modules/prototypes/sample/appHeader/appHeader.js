import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { Header, HeaderRow, HeaderTabs } from 'react-mdl/lib/Layout';
import { Tab } from 'react-mdl/lib/Tabs';

import logo from '../../assets/logo.png';
import background from '../../assets/header-bg.jpg';

import styles from '../../common/styles';

const AppHeader = ({ sheet: { classes } }) => (
  <Header waterfall hideTop={false} className={classes.header}>
    <HeaderRow className={classes.logoRow}>
      <div className={classes.logo} />
    </HeaderRow>
    <HeaderTabs ripple activeTab={1} className={[styles.container, classes.nav].join(' ')}>
      <Tab>首页</Tab>
      <Tab>供应</Tab>
      <Tab>采购</Tab>
      <Tab>微店</Tab>
      <Tab>市场行情</Tab>
      <Tab>我的润财</Tab>
    </HeaderTabs>
  </Header>
);

AppHeader.propTypes = {
  sheet: PropTypes.object,
}

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

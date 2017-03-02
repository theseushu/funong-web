import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import { Header, HeaderRow, Navigation } from 'react-mdl/lib/Layout';
import logoHorizontal from 'assets/logo-horizontal.png';
import logoBig from 'assets/logo-big.png';
import styles, { colors, breakpoints } from '../../styles';
import background from './assets/header-bg.jpg';

const routes = [
  { title: '首页', path: '/' },
  { title: '供应', path: '/supplies' },
  { title: '采购', path: '/' },
  { title: '乡村游', path: '/trips' },
  { title: '我的润财', path: '/me' },
  { title: '物流', path: '/logistics' },
  { title: '微店', path: '/shops' },
];

const AppHeader = ({ sheet: { classes }, header }) => (
  <Header waterfall hideTop={false} className={classes.header}>
    <HeaderRow className={classes.logoRow}>
      { header || <div className={classes.logo} /> }
    </HeaderRow>
    <HeaderRow className={classes.nav}>
      <div className={styles.container}>
        <Navigation className={classes.links}>
          { routes.map((route, i) => <Link key={i} activeClassName={classes.activeLink} to={route.path}>{route.title}</Link>) }
        </Navigation>
      </div>
    </HeaderRow>
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
    background: `url(${logoBig})`,
    height: 100,
    width: 250,
    '.is-compact &': {
      background: `url(${logoHorizontal})`,
      height: 40,
      width: 166,
    },
  },
  nav: {
    height: 45,
    padding: 0,
    background: 'rgba(76,175,80, 0.08)',
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  links: {
    height: '45px !important',
    display: 'flex',
    justifyContent: 'space-between',
    '& > .mdl-navigation__link': {
      flex: 1,
      textAlign: 'center',
      padding: 0,
      height: 42,
      lineHeight: '42px',
    },
  },
  activeLink: {
    borderBottom: `solid 3px ${colors.colorAccent}`,
  },
})(AppHeader);

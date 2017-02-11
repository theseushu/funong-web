import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import Button from 'react-mdl/lib/Button';
import { colors, shadows, breakpoints } from '../../styles';
import SubMenu from './subMenu';

const SideMenu = ({ routes, classes }) => (
  <div>
    <div className={`${classes.sideMenu} ${shadows.shadow2}`}>
      {routes.map((route, i) => {
        if (!route.routes) {
          return (<Link key={i} to={route.path} onlyActiveOnIndex activeClassName={classes.active}><Button>{route.title}</Button></Link>);
        }
        return (
          <SubMenu key={i} route={route} classes={classes} />
        );
      })}
    </div>
  </div>
  );

SideMenu.propTypes = {
  classes: PropTypes.object,
  routes: PropTypes.array.isRequired,
};


export default injectSheet({
  active: {
    '& > button': {
      color: `${colors.colorAccent} !important`,
    },
  },
  sideMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    padding: 16,
    '& button': {
      width: '100%',
      textAlign: 'left',
      color: colors.colorSubTitle,
    },
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
  },
  itemWithSubMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    '& > button.active': {
      color: 'black',
    },
  },
  subMenu: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'stretch',
    overflow: 'hidden',
    transition: '',
    '& button': {
      paddingLeft: 20,
    },
  },
})(SideMenu);

import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Link from 'react-router/lib/Link';
import logoHorizontal from 'assets/logo-horizontal.png';


const LogoLeft = ({ sheet: { classes }, children }) => (
  <div className={classes.logoLeft}>
    <Link to="/" className={classes.logo}><img role="presentation" src={logoHorizontal} /></Link>
    <div className={classes.children}>
      {children}
    </div>
  </div>
);

LogoLeft.propTypes = {
  sheet: PropTypes.object,
  children: PropTypes.any,
};

export default injectSheet({
  logoLeft: {
    display: 'flex',
  },
  logo: {
    height: 100,
    width: 250,
    '& > img': {
      height: 100,
      width: 250,
    },
    '.is-compact &': {
      display: 'none',
    },
  },
  children: {
    flex: 1,
  },
})(LogoLeft);

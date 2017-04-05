import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Textfield from 'react-mdl/lib/Textfield';
import IconButton from 'react-mdl/lib/IconButton';
import logoHorizontal from 'assets/logo-horizontal.png';
import logoBig from 'assets/logo-big.png';
import logoSmall from 'assets/logo.png';
import { breakpoints } from 'modules/common/styles';

const Search = ({ classes }) => (
  <form className={classes.search}>
    <Textfield
      onChange={() => {}}
      label="搜索"
    />
    <IconButton name="search" type="submit" />
  </form>
);

Search.propTypes = {
  classes: PropTypes.object.isRequired,
};

const StyledSearch = injectSheet({
  search: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    '& .mdl-textfield': {
      minWidth: 0,
      width: 'auto',
      flex: 1,
    },
  },
})(Search);

const DefaultHeader = ({ classes, onSearch }) => (
  <div className={classes.defaultHeader}>
    <div className={classes.logo}>
      <img src={logoBig} role="presentation" />
    </div>
    <div className={classes.logoSmall}>
      <img src={logoSmall} role="presentation" />
    </div>
    <div className={classes.logoHorizontal}>
      <img src={logoHorizontal} role="presentation" />
    </div>
    {onSearch && <div className={classes.search}><StyledSearch /></div>}
  </div>
);

DefaultHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  onSearch: PropTypes.func,
};

export default injectSheet({
  defaultHeader: {
    display: 'flex',
    '.is-compact &': {
    },
  },
  logo: {
    [breakpoints.mediaDestkopBelow]: {
      display: 'none',
    },
    '.is-compact &': {
      display: 'none',
    },
  },
  logoSmall: {
    [breakpoints.mediaDestkopAbove]: {
      display: 'none',
    },
    '.is-compact &': {
      display: 'none',
    },
  },
  logoHorizontal: {
    display: 'none',
    '.is-compact &': {
      display: 'block',
    },
  },
  search: {
    flex: 1,
    marginLeft: 24,
    '& > *': {
      maxWidth: 400,
    },
    textAlign: 'right',
    '.is-compact &': {
      display: 'none',
    },
  },
})(DefaultHeader);

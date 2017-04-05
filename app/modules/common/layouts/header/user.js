import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import Link from 'react-router/lib/Link';
import IconButton from 'react-mdl/lib/IconButton';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { breakpoints, colors } from 'modules/common/styles';
import { Avatar } from 'modules/common/user';

const User = ({ user, classes }) => (
  user ? (
    <div>
      <Link to="/me" id="_top_menu_user"><Avatar user={user} className={classes.avatar} /></Link>
    </div>
  ) : (
    <Link to="/login" className={classes.login}>
      <IconButton name="person" />
      <span>登录</span>
    </Link>
  )
);

User.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
};

export default injectSheet({
  avatar: {
    margin: 4,
    width: 24,
    height: 24,
  },
  login: {
    color: colors.colorSubTitle,
    [breakpoints.mediaTabletBelow]: {
      '& > span': {
        display: 'none',
      },
    },
  },
})(connect(
  (state) => ({ user: currentUserSelector(state) }),
)(User));

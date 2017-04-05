import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { connect } from 'react-redux';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Avatar from 'modules/common/user/avatar';
import { breakpoints } from 'modules/common/styles';


const MeHeader = ({ user, classes }) => (
  <div className={classes.meHeader}>
    <Avatar user={user} className={classes.avatar} />
  </div>
);

MeHeader.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

export default injectSheet({
  meHeader: {
    display: 'flex',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    '.is-compact &': {
    },
    [breakpoints.mediaDestkopBelow]: {
      marginRight: 100,
    },
  },
  avatar: {
    width: 80,
    height: 80,
    '.is-compact &': {
      width: 48,
      height: 48,
    },
    '& > i': {
      fontSize: 80,
    },
  },
})(connect(
  (state) => ({ user: currentUserSelector(state) }),
)(MeHeader));

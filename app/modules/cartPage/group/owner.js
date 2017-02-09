import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Avatar from 'modules/common/avatar/avatar';

const Owner = ({ user, classes }) => (
  <div className={classes.owner}>
    <div className={classes.avatar}>
      <Avatar user={user} />
    </div>
    <div>{user.name}</div>
  </div>
);

Owner.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  owner: {
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    width: 30,
    height: 30,
    margin: '0 16px',
  },
})(Owner);

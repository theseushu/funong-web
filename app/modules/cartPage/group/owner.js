import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Checkbox from 'react-mdl/lib/Checkbox';
import Avatar from 'modules/common/avatar/avatar';

const Owner = ({ user, classes, checked, onChange }) => (
  <div className={classes.owner}>
    <div>
      <Checkbox ripple checked={checked} onChange={onChange} />
    </div>
    <div className={classes.avatar}>
      <Avatar user={user} />
    </div>
    <div>{user.name}</div>
  </div>
);

Owner.propTypes = {
  user: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  checked: PropTypes.bool.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default injectSheet({
  owner: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 16px',
  },
  avatar: {
    width: 30,
    height: 30,
    margin: '0 16px',
  },
})(Owner);

import React, { PropTypes } from 'react';

import MdAccountCircle from 'react-icons/lib/md/account-circle';
import injectSheet from 'react-jss';

const styles = {
  wrapper: {
    borderRadius: '50%',
    '&>img': {
      width: '100%',
      height: '100%',
    },
  },
};

const AvatarComponent = ({ user, onClick, sheet: { classes } }) => (
  <div className={`${classes.wrapper} shadow--2`}>
    <a
      onClick={(e) => {
        e.preventDefault();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      href="#avatar"
    >
      {
          user && user.avatar ?
            <img role="presentation" src={user.avatar.url} /> :
            <MdAccountCircle
              style={{
                position: 'relative',
                top: '-10%',
                left: '-10%',
                width: '120%',
                height: '120%',
              }}
              onClick={onClick}
            />
        }
    </a>
  </div>
);

AvatarComponent.propTypes = {
  user: PropTypes.object,
  onClick: PropTypes.func,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(AvatarComponent);

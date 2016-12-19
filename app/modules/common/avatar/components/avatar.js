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

const Content = ({ user }) => (
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
      />
  );

Content.propTypes = {
  user: PropTypes.object,
}

const AvatarComponent = ({ shadow = 0, user, onClick, sheet: { classes } }) => {
  const component = typeof onClick === 'function' ?
    (<a
      onClick={(e) => {
        e.preventDefault();
        if (typeof onClick === 'function') {
          onClick(e);
        }
      }}
      href="#avatar"
    ><Content user={user} /></a>) :
    <Content user={user} />;
  return (
    <div className={`${classes.wrapper} shadow--${shadow}`}>
      {component}
    </div>
  );
};

AvatarComponent.propTypes = {
  shadow: PropTypes.number,
  user: PropTypes.object,
  onClick: PropTypes.func,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(AvatarComponent);

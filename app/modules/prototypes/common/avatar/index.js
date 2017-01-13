import React, { PropTypes } from 'react';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
import injectSheet from 'react-jss';
import { Card } from 'react-mdl';

const styles = {
  wrapper: {
    width: '100%',
    height: '100%',
    minHeight: 0,
    borderRadius: '50%',
    '&>img': {
      width: '100%',
      height: '100%',
    },
  },
};

const Content = ({ user }) => (
  (user && user.avatar) ?
    <img role="presentation" src={user.avatar.url} /> :
    <MdAccountCircle
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        transform: 'scale(1.2,1.2)',
      }}
    />
);

Content.propTypes = {
  user: PropTypes.object,
};

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
    <Card className={classes.wrapper} shadow={shadow}>
      {component}
    </Card>
  );
};

AvatarComponent.propTypes = {
  shadow: PropTypes.number,
  user: PropTypes.object,
  onClick: PropTypes.func,
  sheet: PropTypes.object.isRequired,
};

export default injectSheet(styles)(AvatarComponent);

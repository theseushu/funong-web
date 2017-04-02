import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import User from './user';
import Chat from './chat';

const Account = ({ className, classes }) => (
  <div className={className ? `${className} ${classes.account}` : classes.account}>
    <User />
    <Chat />
  </div>
);

Account.propTypes = {
  className: PropTypes.string,
  classes: PropTypes.object.isRequired,
};

export default injectSheet({
  account: {
    display: 'flex',
    alignItems: 'center',
  },
})(Account);

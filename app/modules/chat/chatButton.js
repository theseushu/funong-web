import React, { PropTypes } from 'react';
import Button from 'react-mdl/lib/Button';
import Tooltip from 'react-mdl/lib/Tooltip';
import init from './init';

const ChatButton = ({ loading, currentUser, user, createConversation, openDialog, children,
  connection, unread, open, // eslint-disable-line
  ...props }, { router }) => {
  if (loading) {
    return (
      <Tooltip label="正在加载组件" position="left">
        <Button {...props} disabled>{children || '在线联系'}</Button>
      </Tooltip>
    );
  }
  const { connecting } = connection;
  if (connecting) {
    return (
      <Tooltip label="正在登录" position="left">
        <Button {...props} disabled>{children || '在线联系'}</Button>
      </Tooltip>
    );
  }
  return (
    <Button
      {...props}
      disabled={currentUser && currentUser.objectId === user.objectId}
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (!currentUser) {
          router.push('/login');
        } else {
          createConversation({ currentUser, user });
          openDialog(user);
        }
      }}
    >{children || '在线联系'}</Button>
  );
};

ChatButton.propTypes = {
  user: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  connection: PropTypes.object,
  children: PropTypes.any,
  createConversation: PropTypes.func,
  openDialog: PropTypes.func,
};
ChatButton.contextTypes = {
  router: PropTypes.object.isRequired,
};

export default init(ChatButton);

import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import Tooltip from 'react-mdl/lib/Tooltip';
import { colors } from 'modules/common/styles';
import ApiIconButton from 'modules/common/buttons/ApiIconButton';
import Badge from './components/badge';
import init from './init';

const ChatIconButton = ({ loading, open, openDialog, connection, unread, currentUser, classes }) => {
  if (loading) {
    return (
      <div className={connecting ? `${classes.chat} ${classes.connecting}` : classes.chat}>
        <Tooltip label="正在加载组件" position="left">
          <ApiIconButton pending />
        </Tooltip>
      </div>
    );
  }
  const { connecting, connected } = connection;
  return (
    currentUser ? (
      <div className={connecting ? `${classes.chat} ${classes.connecting}` : classes.chat}>
        {
          connecting && (
            <Tooltip label="正在登录" position="left">
              <ApiIconButton
                pending={false}
                icon="chat"
                onClick={
                  (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }
                }
              />
            </Tooltip>
          )
        }
        {
          connected && (
            <ApiIconButton
              pending={false}
              icon="chat"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                if (!open) {
                  openDialog();
                }
              }}
            />
          )
        }
        {connected && !open && unread > 0 && <Badge className={classes.unread} />}
      </div>
    ) : null
  );
};
ChatIconButton.propTypes = {
  classes: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  currentUser: PropTypes.object,
  connection: PropTypes.object,
  open: PropTypes.bool,
  openDialog: PropTypes.func,
  unread: PropTypes.number,
};

export default injectSheet({
  chat: {
    position: 'relative',
    '& button': {
      color: colors.colorSubTitle,
    },
  },
  connecting: {
    animation: 'connecting-animation 1s infinite alternate',
  },
  '@keyframes connecting-animation': {
    from: { opacity: 0.1 },
    to: { opacity: 0.8 },
  },
  unread: {
    position: 'absolute',
    top: 2,
    right: 2,
  },
})(init(ChatIconButton));

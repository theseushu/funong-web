import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { colors } from 'modules/common/styles';
import { actions, selectors } from 'modules/chat/ducks';

const Chat = ({ openDialog, connection, user, classes }) => {
  const { connecting, connected } = connection;
  return (
    user ? (
      <div className={connecting ? `${classes.chat} ${classes.connecting}` : classes.chat}>
        {
          connecting && (
            <Tooltip label="正在登录" position="left">
              <IconButton
                name="chat"
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
            <IconButton
              name="chat"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openDialog();
              }}
            />
          )
        }
      </div>
    ) : null
  );
};
Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  connection: PropTypes.object,
  openDialog: PropTypes.func.isRequired,
};

const connectStateSelector = selectors.connection;

export default injectSheet({
  chat: {
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
})(connect(
  (state) => ({ user: currentUserSelector(state), connection: connectStateSelector(state) }),
  (dispatch) => bindActionCreators({ openDialog: actions.openDialog }, dispatch),
)(Chat));

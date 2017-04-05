import React, { PropTypes } from 'react';
import _find from 'lodash/find';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import IconButton from 'react-mdl/lib/IconButton';
import Tooltip from 'react-mdl/lib/Tooltip';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { colors } from 'modules/common/styles';
import { selectors as dataSelectors } from './ducks/data';
import { actions as dialogActions, selectors as dialogSelectors } from './ducks/dialog';
import { selectors } from './ducks/connection';
import Badge from './components/badge';

const Chat = ({ open, openDialog, connection, unread, user, classes }) => {
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
              name="goat"
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
        {connected && !open && unread && <Badge className={classes.unread} />}
      </div>
    ) : null
  );
};
Chat.propTypes = {
  classes: PropTypes.object.isRequired,
  user: PropTypes.object,
  connection: PropTypes.object,
  open: PropTypes.bool.isRequired,
  openDialog: PropTypes.func.isRequired,
  unread: PropTypes.bool.isRequired,
};

const connectStateSelector = selectors.connection;
const conversationsSelecotr = dataSelectors.conversations;

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
})(connect(
  (state) => ({
    user: currentUserSelector(state),
    connection: connectStateSelector(state),
    unread: !!_find(conversationsSelecotr(state), (conversation) => conversation.unreadMessagesCount > 0),
    open: dialogSelectors.dialog(state).open,
  }),
  (dispatch) => bindActionCreators({ openDialog: dialogActions.openDialog }, dispatch),
)(Chat));

import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Button from 'react-mdl/lib/Button';
import { colors } from 'modules/common/styles';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import Avatar from 'modules/common/user/avatar';
import { actions, selectors } from '../ducks';

const ChatTitle = ({ conversation, user, currentUser, createState, createConversation, classes }) => {
  if (conversation) {
    return (
      <div className={classes.current}>
        <Avatar user={conversation.user} className={classes.avatar} />
        <small>{conversation.user.name}</small>
      </div>
    );
  } else if (user) {
    const { pending, rejected } = createState;
    return (
      <div className={classes.current}>
        <Avatar user={user} className={classes.avatar} />
        {pending && <small>正在创建对话</small>}
        {rejected && <Button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            createConversation({ currentUser, user });
          }}
        >创建失败，重试</Button>
        }
      </div>
    );
  }
  return (
    <div></div>
  );
};
ChatTitle.propTypes = {
  classes: PropTypes.object.isRequired,
  currentUser: PropTypes.object.isRequired,
  user: PropTypes.object,
  conversation: PropTypes.object,
  createConversation: PropTypes.func.isRequired,
  createState: PropTypes.object,
};

const createConversationAction = actions.createConversation;
const createConversationStateSelector = selectors.createConversation;
const currentConversationSelector = selectors.currentConversation;

export default injectSheet({
  current: {
    display: 'flex',
    alignItems: 'center',
    color: colors.colorSubTitle,
  },
  avatar: {
    width: 30,
    height: 30,
    marginRight: '1em',
  },
})(connect(
  (state) => ({
    createState: createConversationStateSelector(state),
    conversation: currentConversationSelector(state),
    currentUser: currentUserSelector(state),
  }),
  (dispatch) => bindActionCreators({ createConversation: createConversationAction }, dispatch),
)(ChatTitle));

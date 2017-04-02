import React, { PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import IconButton from 'react-mdl/lib/IconButton';
import { colors } from 'modules/common/styles';
import Avatar from 'modules/common/user/avatar';
import { actions, selectors } from '../ducks';

const ChatList = ({ current, conversations, setCurrentConversation, quitConversation, classes }) => (
  <List className={classes.list}>
    {
      conversations.map((conversation, i) => {
        const isCurrent = current && current.objectId === conversation.objectId;
        return (
          <ListItem
            key={i}
            twoLine={!isCurrent}
            className={`${classes.item} ${isCurrent ? classes.current : ''} material-transition`}
            onClick={() => setCurrentConversation(conversation.objectId)}
          >
            <ListItemContent
              avatar={
                <div>
                  <Avatar user={conversation.user} className={classes.avatar} />
                </div>
              }
              subtitle={isCurrent ? undefined : conversation.lastMessage}
            >{conversation.user.name}</ListItemContent>
            <ListItemAction>
              <IconButton
                name="close"
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  quitConversation(conversation);
                }}
              />
            </ListItemAction>
          </ListItem>
        );
      })
    }
  </List>
);
ChatList.propTypes = {
  classes: PropTypes.object.isRequired,
  conversations: PropTypes.array.isRequired,
  current: PropTypes.object,
  setCurrentConversation: PropTypes.func.isRequired,
  quitConversation: PropTypes.func.isRequired,
};

const setCurrentConversationAction = actions.setCurrentConversation;
const quitConversationAction = actions.quitConversation;
const currentConversationSelector = selectors.currentConversation;
const conversationsSelector = selectors.conversations;

export default injectSheet({
  list: {
    width: '100%',
  },
  item: {
    '& > .mdl-list__item-primary-content': {
      overflow: 'hidden',
      whiteSpace: 'nowrap',
      '& > .mdl-list__item-avatar': {
        width: 36,
        height: 36,
      },
    },
  },
  current: {
    color: colors.colorAccent,
  },
  avatar: {
    width: 36,
    height: 36,
  },
})(connect(
  (state) => ({
    current: currentConversationSelector(state),
    conversations: conversationsSelector(state),
  }),
  (dispatch) => bindActionCreators({ setCurrentConversation: setCurrentConversationAction, quitConversation: quitConversationAction }, dispatch),
)(ChatList));

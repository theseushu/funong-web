import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, ListItemContent, ListItemAction } from 'react-mdl/lib/List';
import IconButton from 'react-mdl/lib/IconButton';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { colors } from 'modules/common/styles';
import Avatar from 'modules/common/user/avatar';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import { actions as dataActions, selectors as dataSelectors } from '../ducks/data';
import { actions as conversationActions, selectors as conversationSelectors } from '../ducks/conversation';

class ChatList extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    conversations: PropTypes.array.isRequired,
    user: PropTypes.object.isRequired,
    current: PropTypes.object,
    setCurrentConversation: PropTypes.func.isRequired,
    quitConversation: PropTypes.func.isRequired,
    loadRecentConversations: PropTypes.func.isRequired,
    loadRecentState: PropTypes.object,
  }
  componentDidMount() {
    const { loadRecentConversations, user } = this.props;
    loadRecentConversations({ currentUser: user });
  }
  render() {
    const { current, loadRecentState: { pending }, conversations, setCurrentConversation, quitConversation, classes } = this.props;
    return (
      <LoadingDiv pending={pending}>
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
                    <div style={{ width: 10, height: 10, borderRadius: '50%', background: 'red' }}></div>
                  </ListItemAction>
                </ListItem>
              );
            })
          }
        </List>
      </LoadingDiv>
    );
  }
}

const setCurrentConversationAction = dataActions.setCurrentConversation;
const quitConversationAction = conversationActions.quit;
const loadRecentConversationsAction = conversationActions.loadRecent;
const currentConversationSelector = dataSelectors.currentConversation;
const conversationsSelector = dataSelectors.conversations;
const loadRecentConversationsSelector = conversationSelectors.loadRecent;

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
    user: currentUserSelector(state),
    current: currentConversationSelector(state),
    conversations: conversationsSelector(state),
    loadRecentState: loadRecentConversationsSelector(state),
  }),
  (dispatch) => bindActionCreators({ loadRecentConversations: loadRecentConversationsAction, setCurrentConversation: setCurrentConversationAction, quitConversation: quitConversationAction }, dispatch),
)(ChatList));

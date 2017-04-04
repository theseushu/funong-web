import React, { Component, PropTypes } from 'react';
import injectSheet from 'react-jss';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { List, ListItem, ListItemContent } from 'react-mdl/lib/List';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import { colors } from 'modules/common/styles';
import Avatar from 'modules/common/user/avatar';
import LoadingDiv from 'modules/common/glossary/loadingDiv';
import { humanizeTime } from 'utils/displayUtils';
import { messageTypes } from '../constants';
import { actions as dataActions, selectors as dataSelectors } from '../ducks/data';
import { actions as conversationActions, selectors as conversationSelectors } from '../ducks/conversation';
import Badge from './badge';

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
    const { current, loadRecentState: { pending }, conversations, setCurrentConversation, quitConversation, classes } = this.props; // eslint-disable-line no-unused-vars
    return (
      <LoadingDiv pending={pending}>
        <List className={classes.list}>
          {
            conversations.map((conversation, i) => {
              const isCurrent = current && current.objectId === conversation.objectId;
              let lastMessage;
              if (conversation.lastMessage) {
                switch (conversation.lastMessage.type) {
                  case messageTypes.text:
                    lastMessage = conversation.lastMessage.text;
                    break;
                  case messageTypes.image:
                    lastMessage = '[图片]';
                    break;
                  case messageTypes.audio:
                    lastMessage = '[音频]';
                    break;
                  case messageTypes.video:
                    lastMessage = '[视频]';
                    break;
                  case messageTypes.location:
                    lastMessage = '[地址]';
                    break;
                  case messageTypes.file:
                    lastMessage = '[文件]';
                    break;
                  default:
                }
              }
              return (
                <ListItem
                  key={i}
                  twoLine
                  className={`${classes.item} ${isCurrent ? classes.current : ''} material-transition`}
                  onClick={() => setCurrentConversation(conversation.objectId)}
                >
                  <ListItemContent
                    avatar={
                      <div>
                        <Avatar user={conversation.user} className={classes.avatar} />
                        { conversation.unreadMessagesCount > 0 && <Badge className={classes.unread} /> }
                      </div>
                    }
                    subtitle={lastMessage}
                  >{conversation.user.name}{conversation.lastMessageAt && <small className={classes.lastMessageAt}>{humanizeTime(conversation.lastMessageAt)}</small>}</ListItemContent>
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
    margin: 0,
    padding: 0,
  },
  item: {
    position: 'relative',
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
  lastMessageAt: {
    float: 'right',
    color: colors.colorSubTitle,
  },
  unread: {
    position: 'absolute',
    top: 44,
    left: 50,
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

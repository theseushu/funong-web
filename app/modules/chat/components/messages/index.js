import React, { Component, PropTypes } from 'react';
import _throttle from 'lodash/throttle';
import _pickBy from 'lodash/pickBy';
import _map from 'lodash/map';
import _reduce from 'lodash/reduce';
import _findLast from 'lodash/findLast';
import moment from 'moment';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import injectSheet from 'react-jss';
import Waypoint from 'react-waypoint';
import Button from 'react-mdl/lib/Button';
import { colors } from 'modules/common/styles';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import blockLoading from '../../assets/blockLoading.gif';
import { actions as conversationActions } from '../../ducks/conversation';
import { actions as messageActions, selectors as messageSelectors } from '../../ducks/message';
import { selectors } from '../../ducks/data';
import Message from './message';

const groupMessagesByTime = (messages) => _reduce(messages, (result, message) => {
  const latest = _findLast(result);
  if (latest) {
    const latestMessage = _findLast(latest);
    if (latestMessage.timestamp < message.timestamp - 120000) { // 2 minutes
      return { ...result, [message.timestamp]: [message] };
    }
    return { ...result, [latest[0].timestamp]: [...latest, message] };
  }
  return { ...result, [message.timestamp]: [message] };
}, {});

const formatTime = (timestamp) => {
  const now = moment();
  const m = moment(Number(timestamp));
  if (m.year() === now.year()) {
    if (m.month() === now.month()) {
      if (m.day() === now.day()) {
        return m.format('H:mm');
      } else if (m.day() === now.day() - 1) {
        return m.format('昨天 H:mm');
      }
    }
    return m.format('M月D日 H:mm');
  }
  return m.format('YYYY年M月D日 H:mm');
};

class Messages extends Component {
  static propTypes = {
    classes: PropTypes.object.isRequired,
    sendingMessages: PropTypes.object.isRequired,
    messages: PropTypes.array.isRequired,
    conversation: PropTypes.object,
    user: PropTypes.object,
    currentUser: PropTypes.object.isRequired,
    retry: PropTypes.func.isRequired,
    query: PropTypes.func.isRequired,
    markAsRead: PropTypes.func.isRequired,
    queryState: PropTypes.object.isRequired,
  }
  componentDidMount() {
    const { conversation } = this.props;
    if (conversation) {
      this.query(conversation);
    }
  }
  componentWillReceiveProps(nextProps) {
    const { conversation } = this.props;
    const nextConversation = nextProps.conversation;
    if (nextConversation && (!conversation || nextConversation.objectId !== conversation.objectId)) {
      this.query(nextConversation);
    }
    const { messages, sendingMessages } = this.props;
    const { messages: nextMessages, sendingMessages: nextSendingMessages } = nextProps;
    if (Object.keys(sendingMessages).length < Object.keys(nextSendingMessages).length) {
      this.scrollToBottom = true;
    } else if (this.node.scrollTop >= (this.node.scrollHeight - this.node.offsetHeight)) {
      this.scrollToBottom = true;
    } else {
      this.scrollToBottom = false;
      if (nextMessages.length > messages.length && nextMessages[0].timestamp < messages[0].timestamp) { // old messages loaded. we don't want to scroll to top
        this.keepScrollLocation = this.node.scrollHeight;
      } else {
        this.keepScrollLocation = false;
      }
    }
  }
  componentDidUpdate() {
    if (this.scrollToBottom) {
      this.scrollTo(this.node.scrollHeight);
    } else if (this.keepScrollLocation) {
      this.scrollTo(this.node.scrollHeight - this.keepScrollLocation);
    }
  }
  markAsRead = _throttle(() => {
    const { conversation, markAsRead } = this.props;
    markAsRead({ conversation });
  }, 300)
  query = _throttle((conversation) => {
    const { query } = this.props;
    query({ conversation, meta: { storeKey: conversation.objectId } });
  }, 300)
  scrollTo = _throttle((scrollTop) => {
    this.node.scrollTop = scrollTop;
  }, 300)
  render() {
    const { conversation, queryState, user, currentUser, messages, sendingMessages, retry, classes } = this.props;
    if (!conversation) {
      return (
        <div className={classes.messages} ref={(node) => { this.node = node; }} />
      );
    }
    const { historyLoaded } = conversation;
    const { pending, failed } = queryState;
    const grouped = groupMessagesByTime(messages);
    return (
      <div className={classes.messages} ref={(node) => { this.node = node; }}>
        { historyLoaded && <div className={classes.info}><small>已显示全部消息</small></div> }
        { !historyLoaded && pending && <div className={classes.info}><img src={blockLoading} role="presentation" /></div>}
        { !historyLoaded && failed && <div className={classes.info}>加载聊天记录失败<Button accent onClick={() => { this.query(conversation); }}>重试</Button></div>}
        <Waypoint style={{ position: 'absolute', top: 20 }} onEnter={() => { this.query(conversation); }} />
        {
          _reduce(Object.keys(grouped), (result, timestamp) => [
            ...result,
            <div key={result.length} className={classes.info}><small>{formatTime(timestamp)}</small></div>,
            ..._map(grouped[timestamp], (message) => {
              const mine = message.from === currentUser.objectId;
              return (
                <Message key={message.objectId} message={message} mine={mine} user={mine ? currentUser : user} retry={retry} />
              );
            }),
          ], [])
        }
        { _map(sendingMessages, (message, storeKey) => (
          <Message key={storeKey} message={message} mine user={currentUser} retry={retry} storeKey={storeKey} />
        ))}
        <Waypoint onEnter={this.markAsRead} />
      </div>
    );
  }
}

const { retry: retryAction, query: queryAction } = messageActions;
const { markAsRead: markAsReadAction } = conversationActions;
const { query: queryStateSelector } = messageSelectors;
const sendingMessagesSelector = selectors.sendingMessages;
const messagesSelector = selectors.messages;
export default injectSheet({
  messages: {
    flex: 1,
    overflowX: 'hidden',
    overflowY: 'scroll',
    background: 'rgb(245, 245, 245)',
    position: 'relative',
  },
  info: {
    width: '100%',
    textAlign: 'center',
    color: colors.colorSubTitle,
    height: 32,
    '& > small': {
      height: 32,
      lineHeight: '32px',
      padding: '4px 8px',
      background: 'rgb(175, 175, 175)',
      color: 'white',
    },
  },
})(connect(
  (state) => {
    const currentConversation = selectors.currentConversation(state);
    return {
      conversation: currentConversation,
      user: currentConversation ? currentConversation.user : null,
      currentUser: currentUserSelector(state),
      messages: !currentConversation ? [] : messagesSelector(state).filter((message) => message.cid === currentConversation.objectId),
      sendingMessages: !currentConversation ? {} : _pickBy(sendingMessagesSelector(state), ((message) => message.cid === currentConversation.objectId)),
      queryState: (currentConversation && queryStateSelector(state)[currentConversation.objectId]) || {},
    };
  },
  (dispatch) => bindActionCreators({ retry: retryAction, query: queryAction, markAsRead: markAsReadAction }, dispatch),
)(Messages));

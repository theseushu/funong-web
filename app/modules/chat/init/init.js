import React from 'react';
import ReactDOM from 'react-dom';
import _toPairs from 'lodash/toPairs';
import { bindActionCreators } from 'redux';
import { connect, Provider } from 'react-redux';
import { getAsyncInjectors } from 'utils/asyncInjectors';
import { currentUserSelector } from 'modules/data/ducks/selectors';
import * as ducks from '../ducks';
import Chat from '../index';

const { actions } = ducks;
const startChat = actions.start;
const stopChat = actions.stop;

let currentUserId = null;
const startOrStopChat = (store) => {
  const nextUser = currentUserSelector(store.getState());
  const nextUserId = nextUser ? nextUser.objectId : null;
  if (!currentUserId) {
    if (nextUserId) {
      currentUserId = nextUserId;
      store.dispatch(startChat({ user: nextUser }));
    }
  } else if (!nextUserId) {
    currentUserId = null;
    store.dispatch(stopChat());
  } else if (nextUserId !== currentUserId) {
    store.dispatch(stopChat());
    store.dispatch(startChat({ user: nextUser }));
  }
};

let initialized = false;
const init = (store) => {
  if (!initialized) {
    const { injectReducer, injectSagas } = getAsyncInjectors(store);
    _toPairs(ducks.default).forEach((pair) => {
      injectReducer(pair[0], pair[1]);
    });
    injectSagas(ducks.sagas);
    if (process.env.browser) {
      const chatDialogEl = document.createElement('div');
      chatDialogEl.setAttribute('id', '_chat_dialog_');
      document.body.appendChild(chatDialogEl);
      ReactDOM.render(
        <Provider store={store}>
          <Chat />
        </Provider>,
        chatDialogEl
      );
    }
    initialized = true;
    startOrStopChat(store);
    store.subscribe(() => startOrStopChat(store));
  }
  const connectStateSelector = ducks.selectors.connection;
  const conversationsSelecotr = ducks.selectors.conversations;
  return () => connect(
    (state) => ({
      currentUser: currentUserSelector(state),
      connection: connectStateSelector(state),
      unread: conversationsSelecotr(state).filter((conversation) => conversation.unreadMessagesCount > 0).length,
      open: ducks.selectors.dialog(state).open,
    }),
    (dispatch) => bindActionCreators({ openDialog: ducks.actions.openDialog, createConversation: ducks.actions.create }, dispatch),
  );
};

export default init;

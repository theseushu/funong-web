import { call, select, put } from 'redux-saga/effects';
import createDucks from 'api/utils/createCompositeDucks';
import { actions as dataActions, selectors as dataSelectors } from '../data';
import { namespace, selector as rootSelector } from './constants';
import { queryMessages } from '../../api/leancloud';
const debug = require('debug')('funongweb:chat:ducks/message/query');

const { appendMessages, setConversationHistoryLoaded } = dataActions;
const ducks = createDucks({
  key: 'query',
  apiName: null,
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {
    * api(api, { conversation: { objectId } }) {
      try {
        const allMessages = yield select(dataSelectors.messages);
        const conversationMessages = allMessages.filter((m) => m.cid === objectId);
        const firstMessage = conversationMessages.length > 0 ? conversationMessages[0] : null;
        return yield call(queryMessages, objectId, firstMessage);
      } catch (err) {
        debug(err);
        throw err;
      }
    },
    * beforeFulfilled(messages, { payload: { conversation: { objectId } } }) {
      if (messages.length === 0) {
        yield put(setConversationHistoryLoaded(objectId));
      } else {
        yield put(appendMessages(messages));
      }
    },
  },
});
module.exports = ducks;

import { call, put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { actions as dataActions } from '../data';
import { namespace, selector as rootSelector } from './constants';
import { markConversationAsRead } from '../../api/leancloud';

const { appendConversations } = dataActions;

const ducks = createDucks({
  key: 'markAsRead',
  apiName: null,
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {
    * api(api, { conversation: { objectId } }) {
      return yield call(markConversationAsRead, objectId);
    },
    * beforeFulfilled(conversation) {
      yield put(appendConversations([conversation]));
    },
  },
});
module.exports = ducks;

import { call, put } from 'redux-saga/effects';
import createDucks from 'api/utils/createCompositeDucks';
import { actions as dataActions } from '../data';
import { namespace, selector as rootSelector } from './constants';
import { sendMessage } from '../../api/leancloud';

const { addSendingMessage, updateSendingMessage, removeSendingMessage, appendMessages } = dataActions;
const ducks = createDucks({
  key: 'send',
  apiName: null,
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {
    * api(api, { conversation: { objectId }, message }, { storeKey }) {
      yield put(addSendingMessage(storeKey, { ...message, cid: objectId }));
      try {
        return yield call(sendMessage, objectId, message);
      } catch (err) {
        yield put(updateSendingMessage(storeKey, { ...message, cid: objectId, error: err }));
        throw err;
      }
    },
    * beforeFulfilled(message, { meta: { storeKey } }) {
      yield put(removeSendingMessage(storeKey));
      yield put(appendMessages([message]));
    },
  },
});
module.exports = ducks;

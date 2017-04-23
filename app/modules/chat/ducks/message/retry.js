import { call, put } from 'redux-saga/effects';
import createDucks from 'api/utils/createCompositeDucks';
import { actions as dataActions } from '../data';
import { namespace, selector as rootSelector } from './constants';
import { sendMessage } from '../../api/leancloud';

const { updateSendingMessage, removeSendingMessage, appendMessages } = dataActions;
const ducks = createDucks({
  key: 'retry',
  apiName: null,
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {
    * api(api, { message }, { storeKey }) {
      yield put(updateSendingMessage(storeKey, { ...message, error: null }));
      try {
        return yield call(sendMessage, message.cid, message);
      } catch (err) {
        yield put(updateSendingMessage(storeKey, { ...message, error: err }));
        throw err;
      }
    },
    * beforeFulfilled(message, { meta: { storeKey } }) {
      yield put(removeSendingMessage(storeKey));
      yield put(appendMessages([message]));
    },
  },
});
export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;

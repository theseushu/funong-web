import { call, put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { actions as dataActions } from '../data';
import { namespace, selector as rootSelector } from './constants';
import { createConversation } from '../../api/leancloud';

const { setCurrentConversation, appendConversations } = dataActions;

const ducks = createDucks({
  key: 'create',
  apiName: null,
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {
    * api(api, { currentUser, user }) {
      return yield call(createConversation, currentUser, user);
    },
    * beforeFulfilled(conversation) {
      yield put(appendConversations([conversation]));
      yield put(setCurrentConversation(conversation.objectId));
    },
  },
});
export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;

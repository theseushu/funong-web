import { call, put } from 'redux-saga/effects';
import createDucks from 'api/utils/createDucks';
import { actions as dataActions } from '../data';
import { namespace, selector as rootSelector } from './constants';
import { loadRecentConversations } from '../../api/leancloud';

const { appendConversations } = dataActions;

const ducks = createDucks({
  key: 'loadRecent',
  apiName: null,
  rootSelector: (state) => rootSelector(state),
  namespace,
  sagas: {
    * api(api, { currentUser }) {
      return yield call(loadRecentConversations, currentUser);
    },
    * beforeFulfilled(conversations) {
      yield put(appendConversations(conversations));
    },
  },
});
module.exports = ducks;

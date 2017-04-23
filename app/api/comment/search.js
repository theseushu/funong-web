import { put } from 'redux-saga/effects';
import { setComments } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'search',
  apiName: 'searchComments',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(comments) {
      yield put(setComments(comments));
      return { result: comments.map((comment) => comment.objectId) };
    },
  },
});

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;

import { put } from 'redux-saga/effects';
import { setCategories } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'fetch',
  apiName: 'fetchCategory',
  rootSelector: (state) => rootSelector(state),
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(category) {
      yield put(setCategories([category]));
    },
  },
});

export default ducks.default;
export const actions = ducks.actions;
export const selector = ducks.selector;
export const sagas = ducks.sagas;


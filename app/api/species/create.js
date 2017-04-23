import { put } from 'redux-saga/effects';
import { setSpecies } from 'modules/data/ducks/actions';
import { NAMESPACE } from './constants';
import createDucks from '../utils/createDucks';
import rootSelector from './rootSelector';

const ducks = createDucks({
  key: 'create',
  apiName: 'createSpecies',
  rootSelector,
  namespace: NAMESPACE,
  sagas: {
    * beforeFulfilled(species) {
      yield put(setSpecies([species]));
    },
  },
});

export default ducks.default; export const actions = ducks.actions; export const selector = ducks.selector; export const sagas = ducks.sagas;

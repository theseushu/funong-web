import { call, put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setSpecies } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'createSpecies',
  sagas: {
    * fulfilled(species) {
      yield put(setSpecies([species]));
    },
    * api(method, payload) {
      const species = yield call(method, { ...payload });
      return species;
    },
  },
});

module.exports = ducks;

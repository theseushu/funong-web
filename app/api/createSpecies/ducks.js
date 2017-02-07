import { call, put } from 'redux-saga/effects';
import { setSpecies } from 'modules/data/ducks/actions';
import rootSelector from '../rootSelector';
import namespace from '../namespace';
import createDucks from '../utils/createDucks';

const ducks = createDucks({
  apiName: 'createSpecies',
  rootSelector,
  namespace,
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

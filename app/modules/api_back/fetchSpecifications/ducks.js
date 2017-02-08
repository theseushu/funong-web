import { put } from 'redux-saga/effects';
import createDucks from '../utils/createDucks';
import { setSpecifications } from '../../data/ducks/actions';

const ducks = createDucks({
  apiName: 'fetchSpecifications',
  sagas: {
    * fulfilled(specifications) {
      yield put(setSpecifications(specifications));
    },
  },
});

module.exports = ducks;

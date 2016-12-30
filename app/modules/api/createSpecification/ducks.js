import { takeEvery } from 'redux-saga';
import { call, put, select } from 'redux-saga/effects';
import { createSelector } from 'reselect';
import rootSelector from '../ducks/rootSelector';

import createRestCallStateReducer from '../ducks/createRestCallStateReducer';

import { currentUserSelector } from '../../data/ducks/selectors';
import { setSpecifications } from '../../data/ducks/actions';

const CREATE_SPECIFICATION = 'api/create_specification';
const CREATE_SPECIFICATION_STATE = 'api/create_specification_state';

export default {
  createSpecification: createRestCallStateReducer(CREATE_SPECIFICATION_STATE),
};

export const actions = {
  createSpecification: ({ species, name, meta = {} }) => ({ type: CREATE_SPECIFICATION, payload: { species, name }, meta }),
};

export const selector = createSelector(rootSelector, (api) => api.createSpecification);

export function* createSpecificationSaga({ payload: { species, name }, meta: { resolve, reject } }, api) {
  yield put({ type: CREATE_SPECIFICATION_STATE, payload: { pending: true } });
  try {
    const currentUser = yield select(currentUserSelector);
    const spec = yield call(api.createSpecification, { species, name, creator: currentUser });
    yield put(setSpecifications([spec]));
    yield put({ type: CREATE_SPECIFICATION_STATE, payload: { fulfilled: true, result: spec.objectId } });
    if (typeof resolve === 'function') {
      resolve(spec);
    }
  } catch (error) {
    yield put({ type: CREATE_SPECIFICATION_STATE, payload: { rejected: true, error } });
    if (typeof reject === 'function') {
      reject(error);
    }
  }
}

// watcher Saga:
function* watcher({ api }) {
  yield takeEvery(CREATE_SPECIFICATION, function* saga(action) {
    yield* createSpecificationSaga(action, api);
  });
}

export const sagas = [
  watcher,
];

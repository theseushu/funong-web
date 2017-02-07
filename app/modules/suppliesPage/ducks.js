import combineReducers from 'redux/lib/combineReducers';
import { put } from 'redux-saga/effects';
import createDucks from '../../api/utils/createDucks';
import { setSupplyProducts } from '../data/ducks/actions';

const SLICE_NAME = 'page_supply';

const rootSelector = (state) => state[SLICE_NAME];

const searchSupplyProductsDucks = createDucks({
  apiName: 'searchSupplyProducts',
  rootSelector: (state) => rootSelector(state),
  namespace: `${SLICE_NAME}`,
  sagas: {
    * beforeFulfilled(products) {
      yield put(setSupplyProducts(products));
    },
  },
});

const CRITERIA_ACTION = 'page_supply/set_criteria';

const criteriaReducer = (state = {}, action) => {
  if (action.type === CRITERIA_ACTION) {
    return action.payload;
  }
  return state;
};

const setCriteria = ({ category, species, address }) => ({ type: CRITERIA_ACTION, payload: { category, species, address } });

export default {
  [SLICE_NAME]: combineReducers({
    ...searchSupplyProductsDucks.default,
    criteria: criteriaReducer,
  }),
};

export const actions = {
  searchSupplyProducts: searchSupplyProductsDucks.actions.searchSupplyProducts,
  setCriteria,
};

export const selectors = {
  searchSupplyProducts: searchSupplyProductsDucks.selector,
  criteria: (state) => rootSelector(state).criteria,
};

export const sagas = [
  ...searchSupplyProductsDucks.sagas,
];

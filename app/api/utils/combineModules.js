import _merge from 'lodash/merge';
import _values from 'lodash/values';
import _mapValues from 'lodash/mapValues';
import _union from 'lodash/union';
import combineReducers from 'redux/lib/combineReducers';

export default (modules, SLICE_NAME) => {
  const actions = _merge({}, ..._values(modules).map((module) => module.actions));

  const selectors = _mapValues(modules, (module) => module.selector);

  const sagas = _union(..._values(modules).map((module) => module.sagas));

  const reducer = {
    [SLICE_NAME]: combineReducers(_merge({}, ..._values(modules).map((module) => module.default))),
  };

  return { actions, selectors, sagas, default: reducer };
};

/**
 * I know this is not the right way...
 * Such codes shall be in compiling phase, not runtime
 * But, in order of reducing codes, avoiding bugs, lets settle for this now
 */

import createNames from './createNames';
import createActionCreators from './createActionCreator';
import createReducer from './createReducer';
import createSelector from './createSelector';
import createSaga from './createSaga';

export default ({ apiName, reducerCreator, sagas: { fulfilled, api } }) => {
  const names = createNames(apiName);
  const actions = createActionCreators(names);
  const reducer = createReducer(names, reducerCreator);
  const selector = createSelector(names);
  const sagas = createSaga(names, fulfilled, api);

  return {
    actions,
    default: reducer,
    selector,
    sagas,
  };
};

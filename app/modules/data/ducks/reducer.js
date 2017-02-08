import _merge from 'lodash/merge';
import _omit from 'lodash/omit';
import { UPDATE_DATA, REMOVE_ENTITIES } from './constants';

export default (state = { entities: {} }, action) => {
  if (action.type === UPDATE_DATA) {
    return _merge({}, state, action.payload);
  } else if (action.type === REMOVE_ENTITIES) {
    const { type, ids } = action.payload;
    return { ...state, entities: { ...state.entities, [type]: _omit(state.entities[type], [ids]) } };
  }
  return state;
};

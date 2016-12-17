import _merge from 'lodash/merge';
import { UPDATE_DATA } from './constants';

export default (state = { entities: {} }, action) => {
  if (action.type === UPDATE_DATA) {
    return _merge({}, state, action.payload);
  }
  return state;
};

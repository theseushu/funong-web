import _assign from 'lodash/assign';
import _mapValues from 'lodash/mapValues';
import _omitBy from 'lodash/omitBy';
import _has from 'lodash/has';
import { UPDATE_DATA, REMOVE_ENTITIES, REPLACE_ENTITY } from './constants';

export default (state = { entities: {} }, { type, payload }) => {
  if (type === UPDATE_DATA) { // for each object (e.g. state.entities.users.objectId1, merge it with the one in action.payload if exists. for other properties in action.payload, simply assign it to new state
    const { entities } = payload; // e.g. { users: { 'objectId': { ... }, 'objectId2': { ... } } }
    const stateEntities = state.entities;
    const mergedEntities = {
      ...stateEntities,
      ..._mapValues(entities, (entityValues, entityType) => { // e.g. type: users, entityValues: { 'objectId': { ... }, 'objectId2': { ... } }
        const storeEntityValues = stateEntities[entityType] || {};
        return {
          ...storeEntityValues,
          ..._mapValues(entityValues, (value, id) => _assign({}, storeEntityValues[id], value)), // e.g: id: 'objectId', value: { ... }
        };
      }),
    };
    return { ...state, ...payload, entities: mergedEntities };
  } else if (type === REMOVE_ENTITIES) { // for each object (e.g. state.entities.users.objectId1, omit it if the one in action.payload exists. for other properties in action.payload, simply assign it to new state
    const { entities } = payload; // e.g. { users: { 'objectId': { ... }, 'objectId2': { ... } } }
    const stateEntities = state.entities;
    const mergedEntities = {
      ...stateEntities,
      ..._mapValues(entities, (entityValues, entityType) => { // e.g. type: users, entityValues: { 'objectId': { ... }, 'objectId2': { ... } }
        const storeEntityValues = stateEntities[entityType] || {};
        return _omitBy(storeEntityValues, (value, key) => _has(entityValues, key));
      }),
    };
    return { ...state, ...payload, entities: mergedEntities };
  } else if (type === REPLACE_ENTITY) { // for each object (e.g. state.entities.users.objectId1, replace it with the one in action.payload if exists. for other properties in action.payload, simply assign it to new state
    const { entities } = payload; // e.g. { users: { 'objectId': { ... }, 'objectId2': { ... } } }
    const stateEntities = state.entities;
    const mergedEntities = {
      ...stateEntities,
      ..._mapValues(entities, (entityValues, entityType) => { // e.g. type: users, entityValues: { 'objectId': { ... }, 'objectId2': { ... } }
        const storeEntityValues = stateEntities[entityType] || {};
        return {
          ...storeEntityValues,
          ...entityValues,
        };
      }),
    };
    return { ...state, ...payload, entities: mergedEntities };
  }
  return state;
};

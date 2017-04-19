import _find from 'lodash/find';
import { setPublishes } from 'modules/data/ducks/actions';
import { createPublishesSelector } from 'modules/data/ducks/selectors';
import { routes, publishTypes, publishTypesInfo } from 'appConstants';

const type = publishTypes.inquiry;
const info = publishTypesInfo[type];

export default type;
export const path = routes[`page_my_${info.plural}`];
export const name = `page_my_${info.plural}`;
export const SLICE_NAME = name;
export const apiName = `publishes.${type}.page`;
export const setData = (results) => setPublishes(type, results);
export const selectFromData = (state, ids) => {
  const entries = createPublishesSelector(type)(state);
  return ids.map((id) => _find(entries, (p) => p.objectId === id));
};

export const editPath = info.route;


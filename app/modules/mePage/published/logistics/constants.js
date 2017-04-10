import _find from 'lodash/find';
import { setPublishes } from 'modules/data/ducks/actions';
import { createPublishesSelector } from 'modules/data/ducks/selectors';
import { publishTypes, publishTypesInfo } from 'appConstants';

const type = publishTypes.logistics;
const info = publishTypesInfo[type];

export default type;
export const path = type;
export const name = `me_${info.plural}_page`;
export const SLICE_NAME = `page_me_published_${type}`;
export const apiName = `publishes.${type}.page`;
export const setData = (results) => setPublishes(type, results);
export const selectFromData = (state, ids) => {
  const entries = createPublishesSelector(type)(state);
  return ids.map((id) => _find(entries, (p) => p.objectId === id));
};

export const editPath = info.route;

import { catalogs, publishTypesInfo, publishTypes } from 'appConstants';
import { actions as publishesActions } from 'api/publishes/ducks';

const type = publishTypes.inquiry;
const info = publishTypesInfo[type];
export const catalogGroups = catalogs.groupedFarm;

export default type;
// page for list
export const listRoute = {
  path: `/${info.plural}`,
  name: info.plural,
};
export const noRecommend = true;

// page for single product
export const pageRoute = {
  path: `/${info.route}/:id`,
  name: info.route,
};

export const actions = publishesActions[type];

export const FORM_NAME = type;

export const EMPTY_PRODUCT = {
  category: null,
  species: null,
  name: '',
  location: null,
  desc: '',
  endAt: (Math.floor(new Date().getTime() / 86400000) + 7) * 86400000, // start time of 7 days later
  price: '面议',
  range: [],
};

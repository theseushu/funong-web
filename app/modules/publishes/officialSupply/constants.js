import { routes, catalogs, statusValues, publishTypesInfo, publishTypes } from 'funong-common/lib/appConstants';
import { actions as publishesActions } from 'api/publishes/ducks';

const type = publishTypes.supply;
const info = publishTypesInfo[type];
export const catalogGroups = catalogs.groupedFarm;

export default type;
export const shop = info.shop;

// page for list
export const listRoute = {
  path: routes.page_official_supplies,
  name: `page_official_${info.plural}`,
};

export const actions = publishesActions[type];

export const FORM_NAME = type;

export const EMPTY_PRODUCT = {
  category: null,
  species: null,
  name: '',
  specs: [],
  location: null,
  desc: '',
  images: [],
  labels: [],
  status: statusValues.unavailable.value,
};

export const TEST_PRODUCT = {
  category: { name: '人参果', objectId: '5859445ddc9477148f492652', catalog: { objectId: '1', name: 'aaaa', catalogType: 'adlafdjklsa' } },
  species: null,
  name: '',
  specs: [{ name: '默认', params: ['123 rfdqf'], minimum: 1, unit: '斤', price: 1 }],
  location: null,
  desc: '',
  images: [],
  labels: [],
  status: statusValues.unavailable.value,
};


import { catalogs, statusValues, productTypes } from 'appConstants';
import { actions as productActions } from 'api/products/ducks';

const type = productTypes.supply;
export default type;

// page for list
export const listRoute = {
  path: '/supplies',
  name: 'supplies',
};

export Card from 'modules/common/product/cards/supply';

export BriefCard from 'modules/common/product/cards/supplyBrief';

export const catalogGroups = catalogs.groupedFarm;


// page for single product
export const pageRoute = {
  path: `/${type}/:id`,
  name: type,
};

export const actions = productActions[type];

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

export { supplyLabels as labels } from 'appConstants';

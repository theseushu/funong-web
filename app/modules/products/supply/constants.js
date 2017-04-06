import { catalogs, statusValues } from 'appConstants';

export default 'supply';

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
  path: '/supply/:id',
  name: 'supply',
};

export { actions } from 'api/products/supply';

export const FORM_NAME = 'supply';

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

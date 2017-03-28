import { catalogs, tripLabels } from 'appConstants';

export default 'trip';

// page for list
export const listRoute = {
  path: '/trips',
  name: 'trips',
};

export Card from 'modules/common/product/cards/trip';

export BriefCard from 'modules/common/product/cards/tripBrief';

export const catalogGroups = catalogs.groupedFarm;


// page for single product
export const pageRoute = {
  path: '/trip/:id',
  name: 'trip',
};

export { actions } from 'api/products/trip';

export const FORM_NAME = 'trip';

export const EMPTY_PRODUCT = {
  name: '',
  specs: [],
  location: null,
  desc: '',
  images: [],
  labels: [tripLabels.available.value],
};

export const TEST_PRODUCT = EMPTY_PRODUCT;

export { tripLabels as labels } from 'appConstants';

import { catalogs, statusValues, productTypes } from 'funong-common/lib/appConstants';
import { actions as productActions } from 'api/products/ducks';

const type = productTypes.trip;
export default type;

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
  path: `/${type}/:id`,
  name: type,
};

export const actions = productActions[type];

export const FORM_NAME = type;

export const EMPTY_PRODUCT = {
  name: '',
  specs: [],
  location: null,
  desc: '',
  images: [],
  labels: [],
  status: statusValues.unavailable.value,
};

export const TEST_PRODUCT = EMPTY_PRODUCT;

export { tripLabels as labels } from 'funong-common/lib/appConstants';

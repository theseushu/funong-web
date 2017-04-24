import { routes, statusValues, publishTypesInfo, publishTypes } from 'funong-common/lib/appConstants';
import { actions as publishesActions } from 'api/publishes/ducks';

const type = publishTypes.trip;
const info = publishTypesInfo[type];

export default type;
export const shop = info.shop;

// page for list
export const listRoute = {
  path: routes[`page_${info.plural}`],
  name: `page_${info.plural}`,
};

export const disabled = ['category']; // disable search by category

// page for single product
export const pageRoute = {
  path: routes[`page_${info.route}`],
  name: `page_${info.route}`,
};

export const actions = publishesActions[type];

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

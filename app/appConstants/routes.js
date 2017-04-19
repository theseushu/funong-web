import _reduce from 'lodash/reduce';
import publishTypesInfo, { types as publishTypes } from './publishTypes';

export default {
  page_login: '/login',
  page_signup: '/signup',
  page_welcome: '/welcome',
  page_me: '/me',
  page_my_certs: '/me/certs',
  page_my_cert_personal: '/me/certs?type=personal',
  page_my_cert_company: '/me/certs?type=company',
  page_my_cert_expert: '/me/certs?type=expert',
  page_my_shop: '/me/shop',
  ..._reduce(publishTypesInfo, (result, info, key) => {
    if ([publishTypes.product, publishTypes.flashSale].indexOf(key) > -1) {
      return {
        ...result,
        [`page_my_shop_${info.plural}`]: `/me/shop/${info.plural}`,
      };
    }
    return result;
  }, {}),
  ..._reduce(publishTypesInfo, (result, info, key) => {
    if ([publishTypes.supply, publishTypes.logistics, publishTypes.trip, publishTypes.inquiry].indexOf(key) > -1) {
      return {
        ...result,
        [`page_my_${info.plural}`]: `/me/published/${info.plural}`,
      };
    }
    return result;
  }, {}),
  page_my_bids: '/me/published/bids',
  page_my_cart: '/me/cart',
  page_my_orders: '/me/orders',
  page_my_bookmarks: '/me/bookmarks',
  ..._reduce(publishTypesInfo, (result, info) => ({
    ...result,
    [`page_${info.plural}`]: `/${info.plural}`,
  }), {}),
  ..._reduce(publishTypesInfo, (result, info) => ({
    ...result,
    [`page_${info.route}`]: `/${info.route}/:id`,
  }), {}),
};

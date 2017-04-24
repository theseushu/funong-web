import { productTypes } from 'funong-common/lib/appConstants';

export const productTables = {
  [productTypes.supply]: 'SupplyProduct',
  [productTypes.logistics]: 'LogisticsProduct',
  [productTypes.trip]: 'TripProduct',
  [productTypes.shop]: 'ShopProduct',
};

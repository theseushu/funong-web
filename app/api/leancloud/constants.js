import { productTypes } from 'appConstants';

export const productTables = {
  [productTypes.supply]: 'SupplyProduct',
  [productTypes.logistics]: 'LogisticsProduct',
  [productTypes.trip]: 'TripProduct',
  [productTypes.shop]: 'ShopProduct',
};

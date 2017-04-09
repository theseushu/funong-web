// export default {
//   supply: { value: 'supply', title: '供应', icon: 'goat', plural: 'supplies', table: 'SupplyProduct' },
//   logistics: { value: 'logistics', title: '物流', icon: 'local_shipping', plural: 'logisticsList', table: 'LogisticsProduct' },
//   trip: { value: 'trip', title: '乡村游', icon: 'rowing', plural: 'trips', table: 'TripProduct' },
//   product: { value: 'product', title: '商品', icon: 'shopping_basket', plural: 'products', table: 'ShopProduct' },
//   inquiry: { value: 'inquiry', title: '采购', icon: 'network_check', plural: 'inquiries', table: 'Inquiry' },
//   flashSale: { value: 'flashSale', title: '限时抢购', icon: 'add_alert', plural: 'flashSales', table: 'FlashSale' },
// };

export const types = {
  supply: 'supply',
  logistics: 'logistics',
  trip: 'trip',
  product: 'product',
  inquiry: 'inquiry',
  flashSale: 'flashSale',
};

export default {
  [types.supply]: { title: '供应', icon: 'goat', route: 'gy', plural: 'gys', shop: false, forSale: true },
  [types.logistics]: { title: '物流', icon: 'local_shipping', route: 'wl', plural: 'wls', shop: false, forSale: false },
  [types.trip]: { title: '乡村游', icon: 'rowing', route: 'xcy', plural: 'xcys', shop: false, forSale: false },
  [types.product]: { title: '商品', icon: 'shopping_basket', route: 'sp', plural: 'sps', shop: true, forSale: true },
  [types.inquiry]: { title: '采购', icon: 'network_check', route: 'cg', plural: 'cgs', shop: false, forSale: false },
  [types.flashSale]: { title: '限时抢购', icon: 'add_alert', route: 'xsqg', plural: 'xsqgs', shop: true, forSale: true },
};

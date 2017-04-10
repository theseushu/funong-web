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
  [types.supply]: { title: '供应', icon: 'goat', route: 'supply', plural: 'supplies', shop: false, forSale: true },
  [types.logistics]: { title: '物流', icon: 'local_shipping', route: 'logistics', plural: 'logisticsList', shop: false, forSale: false },
  [types.trip]: { title: '乡村游', icon: 'rowing', route: 'trip', plural: 'trips', shop: false, forSale: false },
  [types.product]: { title: '商品', icon: 'shopping_basket', route: 'product', plural: 'products', shop: true, forSale: true },
  [types.inquiry]: { title: '采购', icon: 'network_check', route: 'inquiry', plural: 'inquiries', shop: false, forSale: false },
  [types.flashSale]: { title: '限时抢购', icon: 'add_alert', route: 'flashSale', plural: 'flashSales', shop: true, forSale: true },
};

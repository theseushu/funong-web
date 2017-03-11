import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import { productTypes } from 'appConstants';

export const groupByOrder = (items) => {
  const shopItems = Object.values(_filter(items, (item) => !!item.shopProduct));
  const supplyItems = Object.values(_filter(items, (item) => !!item.supplyProduct));
  const shopOrders = Object.values(_groupBy(shopItems, (item) => item.shopProduct.shop.objectId));
  const supplyOrders = Object.values(_groupBy(supplyItems, (item) => item.supplyProduct.owner.objectId));
  return {
    shop: shopOrders,
    supply: supplyOrders,
  };
};

// select all useful attributes of supply/logistics/trip/shop products. omit undefined attributes
const itemsToOrderProducts = (items, type) =>
  items.map((item) => {
    const product = item[`${type}Product`];
    return {
      quantity: item.quantity,
      product: _omitBy({
        objectId: product.objectId,
        name: product.name,
        price: product.price,
        labels: product.labels,
        spec: product.specs[item.specIndex],
        thumbnail: product.thumbnail,
        location: product.location,
      }, _isUndefined),
    };
  });

export const groupToOrder = (cartItems) => {
  const result = {};
  Object.values(productTypes).forEach((type) => {
    const orderItems = Object.values(_filter(cartItems, (item) => !!item[`${type}Product`]));
    if (type === productTypes.shop) {
      const orders = _groupBy(orderItems, (item) => item[`${type}Product`].shop.objectId);
      result[type] = _map(orders, (value) => ({ shop: value[0][`${type}Product`].shop, items: itemsToOrderProducts(value, type) }));
    } else {
      const orders = _groupBy(orderItems, (item) => item[`${type}Product`].owner.objectId);
      result[type] = _map(orders, (value) => ({ owner: value[0][`${type}Product`].owner, items: itemsToOrderProducts(value, type) }));
    }
  });
  return result;
};

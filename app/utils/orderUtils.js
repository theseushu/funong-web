import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omitBy from 'lodash/omitBy';
import _orderBy from 'lodash/orderBy';
import _reduce from 'lodash/reduce';
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
      createdAt: item.createdAt,
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
  const result = [];
  Object.values(productTypes).forEach((type) => {
    const orderItems = Object.values(_filter(cartItems, (item) => !!item[`${type}Product`]));
    if (type === productTypes.shop) {
      const orders = _groupBy(orderItems, (item) => item[`${type}Product`].shop.objectId);
      result.push(..._map(orders, (value) => ({ shop: value[0][`${type}Product`].shop, items: itemsToOrderProducts(value, type), services: [] })));
    } else {
      const orders = _groupBy(orderItems, (item) => item[`${type}Product`].owner.objectId);
      result.push(..._map(orders, (value) => ({ owner: value[0][`${type}Product`].owner, items: itemsToOrderProducts(value, type), services: [] })));
    }
  });
  return _orderBy(result, (order) => -(_reduce(order.items, (r, item) => r > item.createdAt ? r : item.createdAt, 0)));
};

export const calculateDelivery = ({ areas }, { address, lnglat }) => {

}

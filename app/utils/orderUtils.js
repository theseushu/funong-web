import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omitBy from 'lodash/omitBy';
import _orderBy from 'lodash/orderBy';
import _reduce from 'lodash/reduce';
import _isUndefined from 'lodash/isUndefined';
import { productTypes, orderFeeTypes } from 'appConstants';
import { distance } from 'utils/mapUtils';

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

/**
 * @param cartItems
 * @return array of orders
 * {
 *  shop (if it's an order of shop products)
 *  owner (if it's an order of other types)
 *  type (the type of products in this order. all products shall be the same type)
 *  items ( array of { quantity, createdAt (date added to cart), product snapshot }
 * }
 */
export const createOrders = (cartItems, address) => {
  const result = [];
  Object.values(productTypes).forEach((type) => {
    const itemsOfType = Object.values(_filter(cartItems, (item) => !!item[`${type}Product`]));
    if (type === productTypes.shop) {
      const groupedOrderItems = _groupBy(itemsOfType, (item) => item[`${type}Product`].shop.objectId);
      result.push(..._map(groupedOrderItems, (orderItems) => {
        const shop = orderItems[0][`${type}Product`].shop;
        const items = itemsToOrderProducts(orderItems, type);
        return calculateOrder({ type, items, shop, user: undefined, services: [], otherFees: {}, address });
      }));
    } else {
      const groupedOrderItems = _groupBy(itemsOfType, (item) => item[`${type}Product`].owner.objectId);
      result.push(..._map(groupedOrderItems, (orderItems) => {
        const user = orderItems[0][`${type}Product`].owner;
        const items = itemsToOrderProducts(orderItems, type);
        return calculateOrder({ type, items, shop: undefined, user, services: [], otherFees: {}, address });
      }));
    }
  });
  return _orderBy(result, (order) => -(_reduce(order.items, (r, item) => r > item.createdAt ? r : item.createdAt, 0)));
};

export const calculateOrder = ({ type, items, shop, user, services, otherFees, address }) => {
  if (type === productTypes.shop) {
    const productAmount = calculateProductAmount(items);
    const delivery = calculateDelivery(shop, address, productAmount);
    let deliveryFee;
    if (!delivery) {
      deliveryFee = undefined;
    } else {
      deliveryFee = delivery.fee != null ? delivery.fee : otherFees[orderFeeTypes.delivery.key] || null;
    }
    return {
      shop,
      type,
      items,
      services,
      delivery,
      productAmount,
      otherFees: _omitBy({
        [orderFeeTypes.delivery.key]: deliveryFee,
        [orderFeeTypes.service.key]: !chargedService ? undefined : otherFees[orderFeeTypes.service.key] || null,
      }, _isUndefined),
      address,
    };
  }
  const productAmount = _reduce(items, (sum, { quantity, product: { spec } }) => sum + (quantity * spec.price), 0);
  const chargedService = _find(services, (s) => s.charge);
  return {
    user,
    type,
    items,
    services,
    productAmount,
    otherFees: _omitBy({
      [orderFeeTypes.service.key]: !chargedService ? undefined : otherFees[orderFeeTypes.service.key] || null,
    }, _isUndefined),
    address,
  };
};
/**
 * @param shop
 * @param delivery address
 * @param productAmount of order's products
 * @return
 * {
 *  inside (is the address inside areas the shop provides service)
 *  fee (delivery fee if address is inside areas and productAmount meets minimum amount)
 *  minimum (lowest minimum productAmount of areas address is in)
 *  raise (to lower delivery fee, how much more shall be added to the order) array of { value (how much more shall be added), fee (delivery fee)}
*  }
 */
export const calculateDelivery = ({ areas, location }, address, productAmount) => {
  if (!address) {
    return null;
  }
  const result = {
    inside: false,
    fee: null,
    minimum: null,
    raise: null,
  };
  const areasInclude = _filter(areas, (area) => {
    if (area.level !== 'custom') {
      const district = address.address[area.level];
      return area.districts.indexOf(district) > -1;
    }
    // custom area
    return (area.distance * 1000) > distance(address.lnglat, location.lnglat);
  });
  if (areasInclude.length > 0) {
    result.inside = true;
  }
  result.fee = _reduce(areasInclude, (fee, area) => area.minimum <= productAmount ? Math.min(area.deliveryFee, fee) : fee, 99999999);
  result.minimum = _reduce(areasInclude, (minimum, area) => Math.min(area.minimum, minimum), 99999999);
  result.fee = result.fee === 99999999 ? null : result.fee;
  result.raise = _filter(areasInclude, (fee, area) => area.deliveryFee < result.fee).map((area) => ({ value: area.minimum - productAmount, fee: area.deliveryFee }));
  return result;
};

export const calculateProductAmount = ({ items }) => _reduce(items, (sum, { quantity, product: { spec } }) => sum + (quantity * spec.price), 0);

export const calculateAmount = ({ otherFees, items }) => {
  if (_filter(otherFees, (value) => value == null).length > 0) {
    return null;
  }
  return _reduce(otherFees, (sum, value) => sum + value, calculateProductAmount({ items }));
};

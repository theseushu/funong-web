import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omitBy from 'lodash/omitBy';
import _orderBy from 'lodash/orderBy';
import _reduce from 'lodash/reduce';
import _isUndefined from 'lodash/isUndefined';
import { productTypes } from 'appConstants';
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

export const groupToOrder = (cartItems) => {
  const result = [];
  Object.values(productTypes).forEach((type) => {
    const orderItems = Object.values(_filter(cartItems, (item) => !!item[`${type}Product`]));
    if (type === productTypes.shop) {
      const orders = _groupBy(orderItems, (item) => item[`${type}Product`].shop.objectId);
      result.push(..._map(orders, (value) => {

        return { shop: value[0][`${type}Product`].shop, items: itemsToOrderProducts(value, type), services: [] };
      }));
    } else {
      const orders = _groupBy(orderItems, (item) => item[`${type}Product`].owner.objectId);
      result.push(..._map(orders, (value) => ({ owner: value[0][`${type}Product`].owner, items: itemsToOrderProducts(value, type), services: [] })));
    }
  });
  return _orderBy(result, (order) => -(_reduce(order.items, (r, item) => r > item.createdAt ? r : item.createdAt, 0)));
};

export const calculateDelivery = ({ areas, location }, { address, lnglat }, amount) => { // eslint-disable-line
  const result = {
    inside: false,
    fee: null,
    minimum: null,
    raise: null,
  };
  const areasInclude = _filter(areas, (area) => {
    let district;
    switch (area.level) {
      case 'country':
        district = address.province;
        break;
      case 'province':
        district = address.city;
        break;
      case 'city':
        district = address.district;
        break;
      case 'district':
        district = address.street;
        break;
      default:
    }
    if (district) {
      return area.districts.indexOf(district) > -1;
    }
    // custom area
    return (area.distance * 1000) > distance(lnglat, location.lnglat);
  });
  if (areasInclude.length > 0) {
    result.inside = true;
  }
  result.fee = _reduce(areasInclude, (fee, area) => area.minimum <= amount ? Math.min(area.deliveryFee, fee) : fee, 99999999);
  result.minimum = _reduce(areasInclude, (minimum, area) => Math.min(area.minimum, minimum), 99999999);
  result.fee = result.fee === 99999999 ? null : result.fee;
  result.raise = _filter(areasInclude, (fee, area) => area.deliveryFee < result.fee).map((area) => ({ value: area.minimum - amount, fee: area.deliveryFee }));
  return result;
};

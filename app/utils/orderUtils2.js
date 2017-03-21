import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omitBy from 'lodash/omitBy';
import _orderBy from 'lodash/orderBy';
import _reduce from 'lodash/reduce';
import _isUndefined from 'lodash/isUndefined';
import { statusValues, productTypes, orderFeeTypes } from 'appConstants';
import { distance } from 'utils/mapUtils';
export const isOwner = (order, user) => {
  if (order.status == null) {
    return true;
  }
  if (order.owner == null || user == null) {
    console.warn(`Insane data: order.status=${order.status}, order.owner=${order.owner}, user=${user}`);
    return false;
  }
  return order.owner.objectId === user.objectId;
};

export const calculateProductAmount = ({ items }) => _reduce(items, (sum, { quantity, product: { spec } }) => sum + (quantity * spec.price), 0);

export const calculateServiceFee = ({ services }) => {
  const result = { fee: 0 };
  if (_find(services, ({ charge }) => charge)) {
    result.fee = -1;
  }
  return result;
};

export const calculateDeliveryFee = ({ items, shop, address }) => {
  const { areas, location } = shop;
  const productAmount = calculateProductAmount({ items });
  const result = {
    inside: false,
    fee: 0,
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
  result.fee = result.fee === 99999999 ? -1 : result.fee;
  result.minimum = _reduce(areasInclude, (minimum, area) => Math.min(area.minimum, minimum), 99999999);
  result.raise = _filter(areasInclude, (fee, area) => area.deliveryFee < result.fee).map((area) => ({ value: area.minimum - productAmount, fee: area.deliveryFee }));
  return result;
};

export const calculateFees = ({ type, items, shop, address, fees, services }) => {
  const productAmount = calculateProductAmount({ items });
  const result = { fees: { [orderFeeTypes.product.key]: productAmount } };
  if (!address) {
    return result;
  }
  if (type === productTypes.supply) {
    const serviceFee = calculateServiceFee({ services });
    result.serviceFee = serviceFee;
    if (serviceFee.fee !== 0) {
      result.fees[orderFeeTypes.service.key] = fees[orderFeeTypes.service.key] || serviceFee.fee;
    } else {
      result.fees[orderFeeTypes.service.key] = 0;
    }
  } else if (type === productTypes.shop) {
    const deliveryFee = calculateDeliveryFee({ items, shop, address });
    result.deliveryFee = deliveryFee;
    if (deliveryFee && deliveryFee.fee !== 0) {
      result.fees[orderFeeTypes.delivery.key] = fees[orderFeeTypes.delivery.key] || deliveryFee.fee;
    } else {
      result.fees[orderFeeTypes.delivery.key] = 0;
    }
  }
  return result;
};

export const calculateAmount = ({ fees }) => {
  if (_filter(fees, (value) => value === -1).length > 0) {
    return -1;
  }
  return _reduce(fees, (sum, value) => sum + value, 0);
};

/**
 ** order is just like the one in database. after calculation, it gets one more attributes:
 *  can: {
 *    requirements: (true|false|nil) whether the user can edit services&message of the order
 *    fees: (true|false|nil) whether the user can edit fees of the order
 *    amount: (true|false|nil) whether the user can edit amount of the order
 *    commit: (statusValues.value or false or nil) what's the next status if user commit the order
 *    cancel: (true|false) whether the user can cancel the order (NOT cancel editing)
 *  }
 *  of course, fees & amount will be re-calculated according to services & address & fees user set
 **/
export const calculateOrder = (order, currentUser) => {
  const { items, address, amount, status } = order;
  if (!address) {
    return _omitBy({ type: order.type, items, shop: order.shop, user: order.user, services: [], fees: {}, can: {} }, _isUndefined);
  }
  const { fees, serviceFee, deliveryFee } = calculateFees(order);
  const result = {
    ...order,
    items,
    fees,
    serviceFee,
    deliveryFee,
    amount: calculateAmount({ items, fees, amount }),
  };
  const isCurrentUserOwner = isOwner(order, currentUser);
  let can = {};
  const feesEditable = (serviceFee && serviceFee.fee === -1) || (deliveryFee && deliveryFee.fee === -1);
  switch (status) {
    case statusValues.shipped.value:
      can = isCurrentUserOwner ? {
        commit: statusValues.finished.value,
      } : {};
      break;
    case statusValues.unshipped.value:
      can = isCurrentUserOwner ? {} : {
        commit: statusValues.shipped.value,
        cancel: true,
      };
      break;
    case statusValues.unbilled.value:
      can = isCurrentUserOwner ? {
        commit: statusValues.unshipped.value,
        cancel: true,
      } : {
        amount: true,
      };
      break;
    case statusValues.unconfirmed.value:
    default:
      can = isCurrentUserOwner ? {
        requirements: true,
        fees: feesEditable,
        commit: !feesEditable ? statusValues.unbilled.value : statusValues.unconfirmed.value,
        cancel: true,
      } : {
        fees: feesEditable,
        amount: true,
        commit: !feesEditable ? statusValues.unbilled.value : false,
      };
  }
  return _omitBy({
    ...result,
    can,
  }, _isUndefined);
};

export const stripOrder = (order) => _omitBy(order, ['can', 'serviceFee', 'deliveryFee']);

export const createOrder = ({ type, items, shop, user, address }) => stripOrder(calculateOrder({ type, items, shop, user, address, services: [], fees: {} }));

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

export const createOrdersFromCartItems = (cartItems, address) => {
  const result = [];
  Object.values(productTypes).forEach((type) => {
    const itemsOfType = Object.values(_filter(cartItems, (item) => !!item[`${type}Product`]));
    if (type === productTypes.shop) {
      const groupedOrderItems = _groupBy(itemsOfType, (item) => item[`${type}Product`].shop.objectId);
      result.push(..._map(groupedOrderItems, (orderItems) => {
        const shop = orderItems[0][`${type}Product`].shop;
        const items = itemsToOrderProducts(orderItems, type);
        return createOrder({ type, items, shop, user: undefined, address });
      }));
    } else {
      const groupedOrderItems = _groupBy(itemsOfType, (item) => item[`${type}Product`].owner.objectId);
      result.push(..._map(groupedOrderItems, (orderItems) => {
        const user = orderItems[0][`${type}Product`].owner;
        const items = itemsToOrderProducts(orderItems, type);
        return createOrder({ type, items, shop: undefined, user, address });
      }));
    }
  });
  return _orderBy(result, (order) => -(_reduce(order.items, (r, item) => r > item.createdAt ? r : item.createdAt, 0)));
};

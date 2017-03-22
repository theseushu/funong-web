import _find from 'lodash/find';
import _filter from 'lodash/filter';
import _groupBy from 'lodash/groupBy';
import _map from 'lodash/map';
import _omit from 'lodash/omit';
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
    const service = calculateServiceFee({ services });
    result.service = service;
    if (service.fee !== 0) {
      result.fees[orderFeeTypes.service.key] = fees[orderFeeTypes.service.key] || service.fee;
    } else {
      result.fees[orderFeeTypes.service.key] = 0;
    }
  } else if (type === productTypes.shop) {
    const delivery = calculateDeliveryFee({ items, shop, address });
    result.delivery = delivery;
    if (delivery && delivery.fee !== 0) {
      result.fees[orderFeeTypes.delivery.key] = fees[orderFeeTypes.delivery.key] || delivery.fee;
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
 ** order is just like the one in database. after calculation, it gets 1 more attributes:
 *  can: {
 *    amount: (true|false|nil) whether the user can edit amount of the order
 *    commit: {
 *      to: (statusValues.value) the next status if user commit the order
 *      available: (boolean or nill) whether the user can commit the order now
 *    } or nil whether the order can be commited
 *    cancel: (true|false) whether the user can cancel the order (NOT cancel editing)
 *  }
 *
 *  if the order is new or unconfirmed or billed, this 'can' object may get more attributes:
 *  requirements: (true|false|nil) whether the user can edit services&message of the order
 *  serviceFee: {
 *    fee: (-1|number) whether the service fee can be calculated automatically
 *  }
 *  deliveryFee: {
 *    inside: (true|false) whether the target address is inside one of shop's areas
 *    fee: (-1|number) whether the service fee can be calculated automatically
 *    minimum: (null|number) the lowest amount to match shop's delivery policy
 *    raise: (array) lower delivery fee
 *  }
 *  amount: (true|false|nil) whether the user can edit amount of the order
 *
 *  of course, fees & amount will be re-calculated according to services & address & fees user set
 **/
export const calculateOrder = (order, currentUser) => {
  const isCurrentUserOwner = isOwner(order, currentUser);
  const { status } = order;
  let can = {};
  switch (status) {
    case statusValues.finished.value: {
      return { ...order, can: {} };
    }
    case statusValues.shipped.value: {
      can = isCurrentUserOwner ? {
        commit: { to: statusValues.finished.value, available: true },
      } : {};
      return { ...order, can };
    }
    case statusValues.payed.value: {
      can = isCurrentUserOwner ? {} : {
        commit: { to: statusValues.shipped.value, available: true },
        cancel: true,
      };
      return { ...order, can };
    }
    case statusValues.billed.value: {
      can = isCurrentUserOwner ? {
        commit: { to: statusValues.payed.value, available: true },
        cancel: true,
      } : {
        amount: true,
        commit: { to: statusValues.billed.value, available: true },
      };
      return { ...order, can };
    }
    case statusValues.unconfirmed.value:
    default: {
      const { items, address } = order;
      if (!address) {
        return _omitBy({
          type: order.type,
          items,
          shop: order.shop,
          user: order.user,
          services: [],
          fees: {},
          can: {},
        }, _isUndefined);
      }
      const { fees, service, delivery } = calculateFees(order);
      const amount = calculateAmount({ items, fees, amount: order.amount });
      const result = {
        ...order,
        items,
        fees,
        amount,
      };
      can = isCurrentUserOwner ? {
        requirements: true,
        service,
        delivery,
        commit: { to: ((service && service.fee === -1) || (delivery && delivery.fee === -1)) ? statusValues.unconfirmed.value : statusValues.billed.value, available: true },
        cancel: true,
      } : {
        service,
        delivery,
        amount: true,
        commit: { to: statusValues.billed.value, available: amount !== -1 },
      };
      return _omitBy({
        ...result,
        can,
      }, _isUndefined);
    }
  }
};

export const stripOrder = (order) => _omit(order, ['can', 'serviceFee', 'deliveryFee']);

const createOrder = ({ type, items, shop, user, address }) => ({ type, items, shop, user, address, services: [], fees: {} });

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

export const commitButtonName = (nextStatus) => {
  switch (nextStatus) {
    case statusValues.finished.value:
      return '确认收货';
    case statusValues.shipped.value:
      return '发货';
    case statusValues.payed.value:
      return '付款';
    case statusValues.billed.value:
      return '确认订单';
    case statusValues.unconfirmed.value:
    default:
      return '保存修改';
  }
};

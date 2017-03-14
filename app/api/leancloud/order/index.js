/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import _find from 'lodash/find';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
// import { calculateAmount } from 'utils/orderUtils';
// import { statusValues } from 'appConstants';
// import { orderToJSON } from '../converters';
// const debug = require('debug')('app:api:order');

export default ({ AV, context }) => {
  class Order extends AV.Object {}
  AV.Object.register(Order);

  const createOrders = async ({ orders }) => {
    const { token: { sessionToken }, profile } = context;
    // const ordersToSave = orders.map(({ type, items, address, user, shop, otherFees, agent, message, services }) => {
    //   const order = new Order();
    //   order.set('type', type);
    //   order.set('items', items);
    //   order.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
    //   order.set('address', address);
    //   if (user) {
    //     order.set('user', AV.Object.createWithoutData('Profile', user.objectId));
    //   }
    //   if (shop) {
    //     order.set('shop', AV.Object.createWithoutData('Shop', shop.objectId));
    //   }
    //   if (agent) {
    //     order.set('agent', AV.Object.createWithoutData('Shop', agent.objectId));
    //   }
    //   order.set('otherFees', otherFees);
    //   order.set('message', message);
    //   order.set('services', services);
    //
    //   const amount = calculateAmount({ items, otherFees });
    //   const status = amount == null ? statusValues.unconfirmed.value : statusValues.unbilled.value;
    //   order.set('status', status);
    //   return order;
    // });

    const savedOrders = await AV.Cloud.rpc('createOrders', { orders }, { sessionToken });
    // const savedOrders = await AV.Object.saveAll(ordersToSave, {
    //   fetchWhenSave: true,
    //   sessionToken,
    // });
    // console.log(orders)
    // console.log(savedOrders)
    return savedOrders.map((savedOrder) => {
      const type = savedOrder.get('type');
      const user = savedOrder.get('user') && savedOrder.get('user').toJSON();
      const shop = savedOrder.get('shop') && savedOrder.get('shop').toJSON();
      const order = _find(orders, (o) => {
        if (o.type !== type) {
          return false;
        }
        if (user) {
          return o.user && o.user.objectId === user.objectId;
        }
        if (shop) {
          return o.shop && o.shop.objectId === shop.objectId;
        }
        return false;
      });
      return _omitBy({ ...savedOrder.toJSON(), user: order.user, shop: order.shop, owner: profile }, _isUndefined);
    });
  };

  return {
    createOrders,
  };
};

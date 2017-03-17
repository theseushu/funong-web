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
// import { orderToJSON } from '../converters';
// const debug = require('debug')('app:api:order');

export default ({ AV, context }) => {
  class Order extends AV.Object {}
  AV.Object.register(Order);

  const createOrders = async ({ orders }) => {
    const { token: { sessionToken }, profile } = context;

    const savedOrders = await AV.Cloud.rpc('createOrders', { orders }, { sessionToken });
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

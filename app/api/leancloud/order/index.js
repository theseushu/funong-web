/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import AV from 'leancloud-storage';
import _find from 'lodash/find';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
import { orderToJSON } from '../utils/converters';
// const debug = require('debug')('app:api:order');

export default ({ context }) => {
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

  const commitOrder = async ({ order }) => {
    const { token: { sessionToken } } = context;
    const { shop, user, owner, agent } = order;
    const avOrder = await AV.Cloud.rpc('commitOrder', { order }, { sessionToken });
    return { ...orderToJSON(avOrder), shop, user, owner, agent };
  };

  const searchOrders = async ({ owner, user, shop, status, type, ascending, descending, skip, limit }) => {
    const { token: { sessionToken } } = context;
    const query = new AV.Query('Order');
    if (owner) {
      query.equalTo('owner', AV.Object.createWithoutData('Profile', owner.objectId));
    }
    if (user) {
      query.equalTo('user', AV.Object.createWithoutData('Profile', user.objectId));
    }
    if (shop) {
      query.equalTo('shop', AV.Object.createWithoutData('Shop', shop.objectId));
    }
    if (status && status.length > 0) {
      query.containedIn('status', status);
    }
    if (type) {
      query.equalTo('type', type);
    }
    query.include([
      'shop', 'shop.thumbnail',
      'owner', 'owner.avatar',
      'user', 'user.avatar',
      'agent', 'agent.avatar',
    ]);
    if (ascending) {
      query.addAscending(ascending);
    } else if (descending) {
      query.addDescending(descending);
    }
    if (skip != null) {
      query.skip(skip);
    }
    if (limit != null) {
      query.limit(limit);
    }
    const orders = await query.find({ sessionToken });
    return orders.map(orderToJSON);
  };

  return {
    createOrders,
    commitOrder,
    searchOrders,
  };
};

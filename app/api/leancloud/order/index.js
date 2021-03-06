/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import _find from 'lodash/find';
import _isUndefined from 'lodash/isUndefined';
import _omitBy from 'lodash/omitBy';
import AV from 'leancloud-storage';
import { orderToJSON } from '../utils/converters';
// const debug = require('debug')('funongweb:api:order');

// const Order = AV.Object.extend('Order');
export default ({ context }) => {
  const createOrders = async ({ orders }) => {
    const { token: { sessionToken, currentUserId } } = context;

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
      return _omitBy({ ...savedOrder.toJSON(), user: order.user, shop: order.shop, owner: { objectId: currentUserId } }, _isUndefined);
    });
  };

  const commitOrder = async ({ order }) => {
    const { token: { sessionToken } } = context;
    const { shop, user, owner, agent } = order;
    const avOrder = await AV.Cloud.rpc('commitOrder', { order }, { sessionToken });
    return { ...orderToJSON(avOrder), shop, user, owner, agent };
  };

  const pageOrders = async (params) => {
    const { token: { sessionToken } } = context;
    const result = await AV.Cloud.rpc('pageOrders', params, { sessionToken });
    return {
      ...result,
      results: result.results.map(orderToJSON),
    };
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

  const generateBill = async (params) => {
    const { token: { sessionToken } } = context;
    const result = await AV.Cloud.rpc('generateBill', params, { sessionToken });
    return result;
  };

  return {
    createOrders,
    commitOrder,
    searchOrders,
    pageOrders,
    generateBill,
  };
};

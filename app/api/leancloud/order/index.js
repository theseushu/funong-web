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
import { isOrderConfirmable, editableFields } from 'utils/orderUtils';
import { statusValues } from 'appConstants';
import { orderToJSON } from '../utils/converters';
const debug = require('debug')('app:api:order');

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

  const updateOrder = async ({ order, services, message, fees, amount }) => {
    const { token: { sessionToken }, profile } = context;

    const avOrder = AV.Object.createWithoutData('Order', order.objectId);
    const fields = editableFields(order, profile);
    const attributes = {};
    if (services || message != null) {
      if (fields.requirements) {
        if (services) {
          attributes.services = services;
        }
        if (message != null) {
          attributes.message = message;
        }
      } else {
        debug('updating un-updatable fileds: (services || message)');
      }
    }
    if (fees != null) {
      if (fields.fees) {
        if (fees) {
          attributes.fees = fees;
        }
      } else {
        debug('updating un-updatable fileds: (fees)');
      }
    }
    if (amount != null) {
      if (fields.amount) {
        if (amount) {
          attributes.amount = amount;
        }
      } else {
        debug('updating un-updatable fileds: (amount)');
      }
    }
    const { updateAt } = await avOrder.save(attributes, { sessionToken });
    return { ...order, ...attributes, updateAt };
  };

  const confirmOrder = async ({ order, fees, amount }) => {
    const { token: { sessionToken }, profile } = context;
    if (!isOrderConfirmable({ ...order, fees, amount }, profile)) {
      throw new Error('You can not confirm this order. This shouldn\'t happen, check out your UI component');
    }
    const avOrder = AV.Object.createWithoutData('Order', order.objectId);
    const fields = editableFields(order, profile);
    const attributes = { status: statusValues.unbilled.value };
    if (fees != null) {
      if (fields.fees) {
        if (fees) {
          attributes.fees = fees;
        }
      } else {
        debug('updating un-updatable fileds: (fees)');
      }
    }
    if (amount != null) {
      if (fields.amount) {
        if (amount) {
          attributes.amount = amount;
        }
      } else {
        debug('updating un-updatable fileds: (amount)');
      }
    }
    const { updateAt } = await avOrder.save(attributes, { sessionToken });
    return { ...order, ...attributes, updateAt };
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
    confirmOrder,
    createOrders,
    updateOrder,
    searchOrders,
  };
};

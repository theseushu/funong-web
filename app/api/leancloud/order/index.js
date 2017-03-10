/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import _filter from 'lodash/filter';
import _omitBy from 'lodash/omitBy';
import _isUndefined from 'lodash/isUndefined';
// import { orderToJSON } from '../converters';
// const debug = require('debug')('app:api:order');

export default ({ AV, context }) => {
  class Order extends AV.Object {}
  AV.Object.register(Order);

  const createOrder = async ({ cartItems, address }) => {
    const { token: { sessionToken }, profile } = context;
    const order = new Order();
    order.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
    order.set('address', address);

    let user;
    let shop;
    let products;
    if (_filter(cartItems, (item) => !!item.supplyProduct).length === cartItems.length) {
      user = cartItems[0].supplyProduct.owner;
      cartItems.forEach((item) => {
        if (item.supplyProduct.owner.objectId !== user.objectId) {
          throw new Error('One order, one receiver');
        }
      });
      products = cartItems.map((cartItem) => {
        const product = cartItem.shopProduct;
        return {
          objectId: product.objectId,
          thumbnail: product.thumbnail,
          spec: product.specs[cartItem.specIndex],
          quantity: cartItem.quantity,
        };
      });
      order.set('user', AV.Object.createWithoutData('Profile', AV.Object.createWithoutData('Profile', user.objectId)));
    } else if (_filter(cartItems, (item) => !!item.shopProduct).length === cartItems.length) {
      shop = cartItems[0].shopProduct.shop;
      cartItems.forEach((item) => {
        if (item.shopProduct.shop.objectId !== shop.objectId) {
          throw new Error('One order, one receiver');
        }
      });
      products = cartItems.map((cartItem) => {
        const product = cartItem.shopProduct;
        return {
          objectId: product.objectId,
          thumbnail: product.thumbnail,
          spec: product.specs[cartItem.specIndex],
          quantity: cartItem.quantity,
        };
      });
      order.set('shop', AV.Object.createWithoutData('Shop', AV.Object.createWithoutData('Shop', shop.objectId)));
    } else {
      throw new Error('One order, one type of product, one receiver');
    }
    order.set('products', products);
    const savedOrder = await order.save(null, {
      fetchWhenSave: true,
      sessionToken,
    });
    return _omitBy({ ...savedOrder, products, user, shop, owner: profile }, _isUndefined);
  };

  return {
    createOrder,
  };
};

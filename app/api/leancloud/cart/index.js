/*
 * important! do not deconstruct context. eg:
 * export default ({ { token, profile } }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import AV from 'leancloud-storage';
import schemas from '../utils/shemas/publishes';
import { cartItemToJSON } from '../utils/converters';
const debug = require('debug')('app:api:file');

export default ({ context }) => {
  class CartItem extends AV.Object {}
  AV.Object.register(CartItem);

  const addCartItem = async ({ quantity, specIndex, type, publish }) => {
    const { token: { sessionToken, currentUserId } } = context;
    try {
      if (!sessionToken) {
        throw new AV.Error(AV.Error.SESSION_MISSING, '未登录用户不能使用购物车');
      }

      const cartItem = new CartItem();
      const table = schemas[type].table;
      if (table) {
        cartItem.set(type, AV.Object.createWithoutData(table, publish.objectId));
      } else {
        throw new AV.Error(AV.Error.OTHER_CAUSE, `无法处理此类商品: ${type}`);
      }
      if (quantity != null) {
        cartItem.set('quantity', quantity);
      }
      if (specIndex != null) {
        cartItem.set('specIndex', specIndex);
      }
      cartItem.set('owner', AV.Object.createWithoutData('_User', currentUserId));
      const saved = await cartItem.save();
      return { ...saved.toJSON(), [type]: publish };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateCartItem = async ({ objectId, quantity, specIndex }) => {
    const { token: { sessionToken } } = context;
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const cartItem = AV.Object.createWithoutData('CartItem', objectId);
      if (quantity != null) {
        cartItem.set('quantity', quantity);
      }
      if (specIndex != null) {
        cartItem.set('specIndex', specIndex);
      }
      await cartItem.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { objectId, quantity };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const removeCartItems = async ({ cartItemIds }) => {
    await AV.Object.destroyAll(cartItemIds.map((cartItemId) => AV.Object.createWithoutData('CartItem', cartItemId)));
    return cartItemIds;
  };
  const fetchCartItems = async () => {
    const { token: { currentUserId } } = context;
    const query = new AV.Query('CartItem')
      .include([
        'supply', 'supply.images', 'supply.category', 'supply.category.catalog', 'supply.species', 'supply.thumbnail', 'supply.owner', 'supply.owner.avatar',
        'logistics', 'logistics.images', 'logistics.thumbnail', 'logistics.owner', 'logistics.owner.avatar',
        'trip', 'trip.images', 'trip.category', 'trip.category.catalog', 'trip.species', 'trip.thumbnail', 'trip.owner', 'trip.owner.avatar',
        'product', 'product.images', 'product.category', 'product.catalog', 'product.species', 'product.thumbnail', 'product.shop', 'product.shop.thumbnail',
        'flashSale', 'flashSale.images', 'flashSale.category', 'flashSale.catalog', 'flashSale.species', 'flashSale.thumbnail', 'flashSale.shop', 'flashSale.shop.thumbnail',
      ]);
    query.equalTo('owner', AV.Object.createWithoutData('_User', currentUserId));
    query
      .limit(1000);
    const cartItems = await query.find();

    return cartItems.map(cartItemToJSON);
  };

  return {
    addCartItem,
    updateCartItem,
    removeCartItems,
    fetchCartItems,
  };
};

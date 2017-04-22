/*
 * important! do not deconstruct context. eg:
 * export default ({ { token, profile } }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import AV from 'leancloud-storage';
import { productTables } from '../constants';
import { cartItemToJSON } from '../utils/converters';
const debug = require('debug')('app:api:file');

export default ({ context }) => {
  class CartItem extends AV.Object {}
  AV.Object.register(CartItem);

  const addCartItem = async ({ quantity, type, product }) => {
    const { token: { sessionToken, currentUserId } } = context;
    try {
      if (!sessionToken) {
        throw new AV.Error(AV.Error.SESSION_MISSING, '未登录用户不能使用购物车');
      }

      const cartItem = new CartItem();
      const table = productTables[type];
      if (table) {
        cartItem.set(`${type}Product`, AV.Object.createWithoutData(table, product.objectId));
      } else {
        throw new AV.Error(AV.Error.OTHER_CAUSE, `无法处理此类商品: ${type}`);
      }
      cartItem.set('quantity', quantity);
      cartItem.set('owner', AV.Object.createWithoutData('_User', currentUserId));
      const saved = await cartItem.save();
      return { ...saved.toJSON(), [type]: product };
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
        'shopProduct', 'shopProduct.images', 'shopProduct.category', 'shopProduct.catalog', 'shopProduct.species', 'shopProduct.thumbnail', 'shopProduct.shop', 'shopProduct.shop.thumbnail',
        'supplyProduct', 'supplyProduct.images', 'supplyProduct.category', 'supplyProduct.category.catalog', 'supplyProduct.species', 'supplyProduct.thumbnail', 'supplyProduct.owner', 'supplyProduct.owner.avatar',
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

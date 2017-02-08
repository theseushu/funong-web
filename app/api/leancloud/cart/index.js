import { cartItemToJSON } from '../converters';
const debug = require('debug')('app:api:file');

export default ({ AV, context: { token: { sessionToken }, profile } }) => {
  class CartItem extends AV.Object {}
  AV.Object.register(CartItem);

  const addCartItem = async ({ shopProduct, supplyProduct, quantity }) => {
    try {
      if (!sessionToken || !profile) {
        throw new AV.Error(AV.Error.SESSION_MISSING, '未登录用户不能使用购物车');
      }
      const cartItem = new CartItem();
      if (shopProduct) {
        cartItem.set('shop', AV.Object.createWithoutData('ShopProduct', shopProduct.objectId));
      } else if (supplyProduct) {
        cartItem.set('supply', AV.Object.createWithoutData('SupplyProduct', supplyProduct.objectId));
      } else {
        throw new AV.Error(AV.Error.OTHER_CAUSE, '未指定商品');
      }
      cartItem.set('quantity', quantity);
      cartItem.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
      const saved = await cartItem.save();
      return { ...saved.toJSON(), shopProduct, supplyProduct };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateCartItem = async ({ objectId, quantity }) => {
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const cartItem = AV.Object.createWithoutData('CartItem', objectId);
      cartItem.set('quantity', quantity);
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

  const removeCartItems = async (cartItemIds) => {
    await AV.Object.destroyAll(cartItemIds.map((cartItemId) => AV.Object.createWithoutData('CartItem', cartItemId)));
    return cartItemIds;
  };

  const fetchCartItems = async () => {
    const query = new AV.Query('CartItem')
      .include([
        'shop', 'shopProduct.thumbnail', 'shopProduct.owner', 'shopProduct.owner.avatar',
        'supplyProduct', 'supplyProduct.thumbnail', 'supplyProduct.owner', 'supplyProduct.owner.avatar',
      ]);
    query.equalTo('owner', AV.Object.createWithoutData('Profile', profile.objectId));
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

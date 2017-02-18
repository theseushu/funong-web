/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { shopToJSON } from '../converters';
const debug = require('debug')('app:api:certs');

export default ({ AV, context }) => {
  class Shop extends AV.Object {}
  AV.Object.register(Shop);

// TODO deal with empty catalogType
  const fetchMyShop = () => new AV.Query('Shop')
    .equalTo('owner', AV.Object.createWithoutData('Profile', context.profile.objectId))
    .include(['images'])
    .first({ sessionToken: context.token.sessionToken })
    .then(shopToJSON);

  const createShop = async ({ name, location, desc, images }) => {
    const { token: { sessionToken }, profile } = context;
    try {
      const shop = new Shop();
      shop.set('name', name);
      shop.set('address', location.address);
      shop.set('lnglat', new AV.GeoPoint(location.lnglat));
      shop.set('desc', desc);
      shop.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
      shop.set('thumbnail', AV.Object.createWithoutData('_File', images[0].id));
      shop.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
      const savedShop = await shop.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedShop.toJSON(), location, desc, images, thumbnail: images[0] };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateShop = async ({ objectId, name, location, desc, images }) => {
    const { token: { sessionToken } } = context;
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const shop = AV.Object.createWithoutData('Shop', objectId);
      if (name) {
        shop.set('name', name);
      }
      if (location && location.address) {
        shop.set('address', location.address);
      }
      if (location && location.lnglat) {
        shop.set('lnglat', new AV.GeoPoint(location.lnglat));
      }
      if (desc) {
        shop.set('desc', desc);
      }
      if (images) {
        shop.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
        shop.set('thumbnail', images.length > 0 ? AV.Object.createWithoutData('_File', images[0].id) : null);
      }
      const savedShop = await shop.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedShop.toJSON(), location, desc, images, thumbnail: images[0] };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    fetchMyShop,
    createShop,
    updateShop,
  };
};

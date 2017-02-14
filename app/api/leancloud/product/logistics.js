/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { logisticsToJSON } from '../converters';
const debug = require('debug')('app:api:logistics');

export default ({ AV, context }) => {
  class LogisticsProduct extends AV.Object {}
  AV.Object.register(LogisticsProduct);

  const createLogisticsProduct = async ({ capacity, maxNumber, price, range, name, location, available, desc, images, labels }) => {
    const { token: { sessionToken }, profile } = context;
    try {
      const logistics = new LogisticsProduct();
      logistics.set('capacity', capacity);
      logistics.set('maxNumber', maxNumber);
      logistics.set('price', price);
      logistics.set('range', range);
      logistics.set('name', name);
      logistics.set('address', location.address);
      logistics.set('lnglat', new AV.GeoPoint(location.lnglat));
      logistics.set('available', available);
      logistics.set('desc', desc);
      logistics.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
      logistics.set('thumbnail', AV.Object.createWithoutData('_File', desc.images[0].id));
      logistics.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
      logistics.set('labels', labels);
      const saved = await logistics.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...saved.toJSON(), capacity, maxNumber, price, range, name, location, images, thumbnail: images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateLogisticsProduct = async ({ objectId, capacity, maxNumber, price, range, name, location, available, desc, images, labels }) => {
    const { token: { sessionToken } } = context;
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const logistics = AV.Object.createWithoutData('LogisticsProduct', objectId);
      if (capacity) {
        logistics.set('capacity', capacity);
      }
      if (maxNumber) {
        logistics.set('maxNumber', maxNumber);
      }
      if (price) {
        logistics.set('price', price);
      }
      if (range) {
        logistics.set('range', range);
      }
      if (name) {
        logistics.set('name', name);
      }
      if (available != null) {
        logistics.set('available', available);
      }
      if (location && location.address) {
        logistics.set('address', location.address);
      }
      if (location && location.lnglat) {
        logistics.set('lnglat', new AV.GeoPoint(location.lnglat));
      }
      if (desc) {
        logistics.set('desc', desc);
      }/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
      if (images) {
        logistics.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
        logistics.set('thumbnail', images.length > 0 ? AV.Object.createWithoutData('_File', images[0].id) : null);
      }
      if (labels != null) {
        logistics.set('labels', labels);
      }
      const saved = await logistics.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...saved.toJSON(), capacity, maxNumber, price, range, name, location, available, images, thumbnail: images ? images[0] : null, labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchLogisticsProduct = async ({ objectId }) => {
    const { token: { sessionToken } } = context;
    const logistics = await AV.Object.createWithoutData('LogisticsProduct', objectId)
      .fetch({
        include: ['images', 'thumbnail', 'owner', 'owner.avatar'],
      }, {
        sessionToken,
      });
    return logistics ? logisticsToJSON(logistics) : null;
  };

  const searchLogisticsProducts = async ({ ownerId }) => {
    const query = new AV.Query('LogisticsProduct')
      .include(['images', 'thumbnail', 'owner', 'owner.avatar']);
    if (ownerId) {
      query.equalTo('owner', AV.Object.createWithoutData('_User', ownerId));
    }
    query
      .limit(1000);
    const logistics = await query.find();

    return logistics.map(logisticsToJSON);
  };

  return {
    createLogisticsProduct,
    updateLogisticsProduct,
    fetchLogisticsProduct,
    searchLogisticsProducts,
  };
};

import { logisticsToJSON } from '../converters';
const debug = require('debug')('app:api:logistics');

export default ({ AV, userId, sessionToken }) => {
  class LogisticsProduct extends AV.Object {}
  AV.Object.register(LogisticsProduct);

  const createLogisticsProduct = async ({ capacity, maxNumber, price, range, name, location, available, desc, labels }) => {
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
      logistics.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
      logistics.set('thumbnail', AV.Object.createWithoutData('_File', desc.images[0].id));
      logistics.set('owner', AV.Object.createWithoutData('_User', userId));
      logistics.set('labels', labels);
      const saved = await logistics.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...saved.toJSON(), capacity, maxNumber, price, range, name, location, desc, thumbnail: desc.images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateLogisticsProduct = async ({ objectId, capacity, maxNumber, price, range, name, location, available, desc, labels }) => {
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
        logistics.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
        if (desc.images && desc.images.length > 0) {
          logistics.set('thumbnail', AV.Object.createWithoutData('_File', desc.images[0].id));
        }
      }
      if (labels != null) {
        logistics.set('labels', labels);
      }
      const saved = await logistics.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...saved.toJSON(), capacity, maxNumber, price, range, name, location, available, desc, thumbnail: desc.images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchLogisticsProduct = async ({ objectId }) => {
    const logistics = await AV.Object.createWithoutData('LogisticsProduct', objectId)
      .fetch({
        include: ['desc.images', 'thumbnail', 'owner'],
      }, {
        sessionToken,
      });
    return logistics ? logisticsToJSON(logistics) : null;
  };

  const searchLogisticsProducts = async ({ ownerId }) => {
    const query = new AV.Query('LogisticsProduct')
      .include(['desc.images', 'thumbnail', 'owner']);
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

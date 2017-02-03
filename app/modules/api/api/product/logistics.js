import { logisticsToJSON } from '../../utils/converters';
const debug = require('debug')('app:api:logistics');

export default ({ AV, userId, sessionToken }) => {

  class Logistics extends AV.Object {}
  AV.Object.register(Logistics);

  const createLogistics = async ({ capacity, range, name, location, desc, labels }) => {
    try {
      const logistics = new Logistics();
      logistics.set('capacity', capacity);
      logistics.set('range', range);
      logistics.set('name', name);
      logistics.set('address', location.address);
      logistics.set('lnglat', new AV.GeoPoint(location.lnglat));
      logistics.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
      logistics.set('owner', AV.Object.createWithoutData('_User', userId));
      logistics.set('labels', labels);
      const saved = await logistics.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...saved.toJSON(), capacity, range, name, location, desc, thumbnail: desc.images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateLogistics = async ({ objectId, capacity, range, name, location, desc, labels }) => {
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const logistics = AV.Object.createWithoutData('Logistics', objectId);
      if (capacity) {
        logistics.set('capacity', capacity);
      }
      if (range) {
        logistics.set('range', range);
      }
      if (name) {
        logistics.set('name', name);
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
      return { ...saved.toJSON(), capacity, range, name, location, desc, thumbnail: desc.images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchLogistics = async ({ objectId }) => {
    const logistics = await AV.Object.createWithoutData('Logistics', objectId)
      .fetch({
        include: ['desc.images', 'thumbnail', 'owner'],
      }, {
        sessionToken,
      });
    return logistics ? logisticsToJSON(logistics) : null;
  };

  const searchLogistics = async ({ ownerId }) => {
    const query = new AV.Query('Logistics')
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
    createLogistics,
    updateLogistics,
    fetchLogistics,
    searchLogistics,
  };
};

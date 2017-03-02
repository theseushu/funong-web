/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import _reduce from 'lodash/reduce';
import { tripProductToJSON } from '../converters';
const debug = require('debug')('app:api:trip');

export default ({ AV, context }) => {
  class TripProduct extends AV.Object {}
  AV.Object.register(TripProduct);

  const createTripProduct = async ({ name, specs, location, desc, images, labels }) => {
    const { token: { sessionToken }, profile } = context;
    try {
      const product = new TripProduct();
      product.set('name', name);
      product.set('specs', specs);
      product.set('minPrice', _reduce(specs, (min, { price }) => Math.min(min, price), 999999));
      product.set('address', location.address);
      product.set('lnglat', new AV.GeoPoint(location.lnglat));
      product.set('desc', desc);
      product.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
      product.set('thumbnail', AV.Object.createWithoutData('_File', images[0].id));
      product.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
      product.set('labels', labels);
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), specs, location, desc, images, owner: profile, thumbnail: images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateTripProduct = async ({ objectId, name, specs, location, desc, images, labels }) => {
    const { token: { sessionToken }, profile } = context;
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const product = AV.Object.createWithoutData('TripProduct', objectId);
      if (name) {
        product.set('name', name);
      }
      if (specs) {
        product.set('specs', specs);
        product.set('minPrice', _reduce(specs, (min, { price }) => Math.min(min, price), 999999));
      }
      if (location && location.address) {
        product.set('address', location.address);
      }
      if (location && location.lnglat) {
        product.set('lnglat', new AV.GeoPoint(location.lnglat));
      }
      if (desc) {
        product.set('desc', desc);
      }
      if (images) {
        product.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
        product.set('thumbnail', images.length > 0 ? AV.Object.createWithoutData('_File', images[0].id) : null);
      }
      if (labels != null) {
        product.set('labels', labels);
      }
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), specs, location, desc, images, owner: profile, thumbnail: images ? images[0] : null, labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchTripProduct = async ({ objectId }) => {
    const { token: { sessionToken } } = context;
    const product = await AV.Object.createWithoutData('TripProduct', objectId)
      .fetch({
        include: ['images', 'thumbnail', 'category', 'species', 'owner', 'owner.avatar'],
      }, {
        sessionToken,
      });
    return product ? tripProductToJSON(product) : null;
  };

  const createQuery = ({ ownerId, category, species, provinces }) => {
    const query = new AV.Query('TripProduct')
      .include(['images', 'thumbnail', 'category', 'species', 'owner', 'owner.avatar']);
    if (ownerId) {
      query.equalTo('owner', AV.Object.createWithoutData('_User', ownerId));
    }
    if (category) {
      query.equalTo('category', AV.Object.createWithoutData('Category', category.objectId));
    }
    if (species) {
      query.containedIn('species', species.map((s) => AV.Object.createWithoutData('Species', s.objectId)));
    }
    if (provinces) {
      query.containedIn('address.province', provinces);
    }
    return query;
  };

  const searchTripProducts = async ({ ownerId, provinces, sort = {}, page, pageSize }) => { // species is an array. so is provinces
    const query = createQuery({ ownerId, provinces });
    if (sort.sort) {
      if (sort.order === 'asc') {
        query.addAscending(sort.sort);
      } else {
        query.addDescending(sort.sort);
      }
    }
    query
      .skip((page - 1) * pageSize)
      .limit(pageSize);
    const products = await query.find();

    return products.map(tripProductToJSON);
  };

  const countTripProducts = async ({ ownerId, category, species, provinces }) => { // species is an array. so is provinces
    const query = createQuery({ ownerId, category, species, provinces });
    return await query.count();
  };

  return {
    createTripProduct,
    updateTripProduct,
    fetchTripProduct,
    searchTripProducts,
    countTripProducts,
  };
};

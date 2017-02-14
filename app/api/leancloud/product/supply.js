/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import { supplyProductToJSON } from '../converters';
const debug = require('debug')('app:api:supply');

export default ({ AV, context }) => {
  class SupplyProduct extends AV.Object {}
  AV.Object.register(SupplyProduct);

  const createSupplyProduct = async ({ category, species, name, specs, location, desc, images, available, labels }) => {
    const { token: { sessionToken }, profile } = context;
    try {
      const product = new SupplyProduct();
      product.set('category', AV.Object.createWithoutData('Category', category.objectId));
      product.set('species', AV.Object.createWithoutData('Species', species.objectId));
      product.set('name', name);
      product.set('specs', specs);
      product.set('address', location.address);
      product.set('lnglat', new AV.GeoPoint(location.lnglat));
      product.set('desc', desc);
      product.set('images', images.map((image) => AV.Object.createWithoutData('_File', image.id)));
      product.set('thumbnail', AV.Object.createWithoutData('_File', images[0].id));
      product.set('owner', AV.Object.createWithoutData('Profile', profile.objectId));
      product.set('available', available);
      product.set('labels', labels);
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), category, species, specs, location, desc, images, thumbnail: images[0], labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateSupplyProduct = async ({ objectId, category, species, name, specs, location, desc, images, available, labels }) => {
    const { token: { sessionToken } } = context;
    if (!objectId) {
      throw new Error('objectId is empty');
    }
    try {
      const product = AV.Object.createWithoutData('SupplyProduct', objectId);
      if (category && category.objectId) {
        product.set('category', AV.Object.createWithoutData('Category', category.objectId));
      }
      if (species && species.objectId) {
        product.set('species', AV.Object.createWithoutData('Species', species.objectId));
      }
      if (name) {
        product.set('name', name);
      }
      if (specs) {
        product.set('specs', specs);
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
      if (available != null) {
        product.set('available', available);
      }
      if (labels != null) {
        product.set('labels', labels);
      }
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), category, species, specs, location, desc, images, thumbnail: images ? images[0] : null, labels };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchSupplyProduct = async ({ objectId }) => {
    const { token: { sessionToken } } = context;
    const product = await AV.Object.createWithoutData('SupplyProduct', objectId)
      .fetch({
        include: ['images', 'thumbnail', 'category', 'category.catalog', 'species', 'owner', 'owner.avatar'],
      }, {
        sessionToken,
      });
    return product ? supplyProductToJSON(product) : null;
  };

  const searchSupplyProducts = async ({ ownerId }) => {
    const query = new AV.Query('SupplyProduct')
      .include(['images', 'thumbnail', 'category', 'category.catalog', 'species', 'owner', 'owner.avatar']);
    if (ownerId) {
      query.equalTo('owner', AV.Object.createWithoutData('_User', ownerId));
    }
    query
      .limit(1000);
    const products = await query.find();

    return products.map(supplyProductToJSON);
  };

  return {
    createSupplyProduct,
    updateSupplyProduct,
    fetchSupplyProduct,
    searchSupplyProducts,
  };
};

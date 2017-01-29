const debug = require('debug')('app:api:supply');

export default ({ AV, userId, sessionToken }) => {
  class SupplyProduct extends AV.Object {}
  AV.Object.register(SupplyProduct);

  const createSupplyProduct = async ({ category, species, name, specs, location, desc, available }) => {
    try {
      const product = new SupplyProduct();
      product.set('category', AV.Object.createWithoutData('Category', category.objectId));
      product.set('species', AV.Object.createWithoutData('Species', species.objectId));
      product.set('name', name);
      product.set('specs', specs);
      product.set('address', location.address);
      product.set('lnglat', new AV.GeoPoint(location.lnglat));
      product.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
      product.set('owner', AV.Object.createWithoutData('_User', userId));
      product.set('available', available);
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), category, species, specs, location, desc };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateSupplyProduct = async ({ objectId, category, species, name, specs, location, desc, available }) => {
    try {
      const product = new SupplyProduct(objectId);
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
        product.set('desc', { ...desc, images: desc.images.map((image) => AV.Object.createWithoutData('_File', image.id)) });
      }
      if (available != null) {
        product.set('available', available);
      }
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), category, species, specs, location, desc };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  return {
    createSupplyProduct,
    updateSupplyProduct,
  };
};

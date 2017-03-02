/*
 * important! do not deconstruct context. eg:
 * export default ({ AV, { token, profile }, updateContextProfile }) => {
 * ...
 * }
 * this object is mutable, deconstruction could cause latest value untouchable
 * wait until I figure out a better way
 */
import _reduce from 'lodash/reduce';
import _map from 'lodash/map';
import { supplyProductToJSON } from '../converters';
import { supplySchema } from './schemas';
const debug = require('debug')('app:api:supply');

export default ({ AV, context }) => {
  class SupplyProduct extends AV.Object {}
  AV.Object.register(SupplyProduct);

  const createSupplyProduct = async (params) => {
    const { token: { sessionToken }, profile } = context;
    try {
      const attrs = { ...params, owner: profile };
      const product = new SupplyProduct();
      _map(attrs, (value, key) => {
        const attrSchema = supplySchema[key];
        if (!attrSchema || !attrSchema.create) {
          throw new Error(`Unsupported attr(${key}) in supplyProduct creating`);
        }
        attrSchema.create(AV, product, value);
      });
      const savedProduct = await product.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...savedProduct.toJSON(), ...attrs };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const updateSupplyProduct = async ({ product, ...attrs }) => {
    const { token: { sessionToken } } = context;
    if (!product || !product.objectId) {
      throw new Error('objectId is empty');
    }
    try {
      console.log(attrs.images)
      const toSave = AV.Object.createWithoutData('SupplyProduct', product.objectId);
      _map(attrs, (value, key) => {
        const attrSchema = supplySchema[key];
        if (!attrSchema || !attrSchema.update) {
          throw new Error(`Unsupported attr(${key}) in supplyProduct creating`);
        }
        attrSchema.update(AV, toSave, value);
      });
      const savedProduct = await toSave.save(null, {
        fetchWhenSave: true,
        sessionToken,
      });
      return { ...product, ...savedProduct.toJSON(), ...attrs };
    } catch (err) {
      debug(err);
      throw err;
    }
  };

  const fetchSupplyProduct = async ({ objectId }) => {
    const { token: { sessionToken } } = context;
    const product = await AV.Object.createWithoutData('SupplyProduct', objectId)
      .fetch({
        include: ['images', 'thumbnail', 'category', 'species', 'owner', 'owner.avatar'],
      }, {
        sessionToken,
      });
    return product ? supplyProductToJSON(product) : null;
  };

  const createQuery = ({ ownerId, category, species, provinces }) => {
    const query = new AV.Query('SupplyProduct')
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

  const searchSupplyProducts = async ({ ownerId, category, species, provinces, sort = {}, page, pageSize }) => { // species is an array. so is provinces
    const query = createQuery({ ownerId, category, species, provinces });
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

    return products.map(supplyProductToJSON);
  };

  const countSupplyProducts = async ({ ownerId, category, species, provinces }) => { // species is an array. so is provinces
    const query = createQuery({ ownerId, category, species, provinces });
    return await query.count();
  };

  return {
    createSupplyProduct,
    updateSupplyProduct,
    fetchSupplyProduct,
    searchSupplyProducts,
    countSupplyProducts,
  };
};
